import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { store } from './redux/store';

import Router from './routes/index';
import './config/logger';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import * as Updates from 'expo-updates';
import AuthService from './services/AuthService';
import { get_coach_me } from './api/Coach';
import { get_athlete_me } from './api/Athlete';
import ContextService from './services/ContextService';
import { get_request_by_athlete_id } from './api/Request';
import { loadFonts } from './configs/design/font';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        // Check for updates
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.error("Update check failed:", e);
      }

      await loadFonts();
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

      const auth = await AuthService.getAuth();
      if (auth) {
        await scheduleNotification();

        const { type } = auth.user;
        let user;
        if (type === 'coach') {
          user = await get_coach_me();
        } else if (type === 'athlete') {
          user = await get_athlete_me();
        }

        if (user) {
          await AuthService.setUser(user.content);
          await AuthService.checkExpoToken(user.content);
        }
      }

      // Gestion des notifications
      const notificationListener = Notifications.addNotificationReceivedListener(
        async (notification) => {
          const { type } = notification.request.content.data;
          if (type === 'ATHLETE_REQUEST_PROCESS') {
            const user = await get_athlete_me();
            if (user) {
              await AuthService.setUser(user.content);
            }
          }
        }
      );

      const responseListener = Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          await processNotification(response);
        }
      );

      // Cleanup des listeners à la fin
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }

    initializeApp().then(() => setLoaded(true));
  }, []);

  const processNotification = async (data) => {
    const navigation = ContextService.get('current_navigation');
    const { type } = data.notification.request.content.data;

    let screen;
    let item;
    switch (type) {
      case 'COACH_NEW_REQUEST':
        const { athleteId } = data.notification.request.content.data;
        if (athleteId) {
          screen = 'TreshRequestCoachScreen';
          const res = await get_request_by_athlete_id(athleteId);
          if (res.status === 200) {
            item = res.data.request;
          }
        }
        break;
      case 'COACH_GOAL_HIT':
        screen = 'DashboardScreen';
        break;
      case 'ATHLETE_REQUEST_PROCESS':
        const user = await AuthService.getUser();
        if (user.coach) {
          screen = 'CoachSheetScreen';
          item = {};
        }
        break;
      default:
        return;
    }
    if (screen) {
      await navigation.navigate(screen, { item });
    }
  };

  const scheduleNotification = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Provider store={store}>
        {!loaded ? <ActivityIndicator /> : <Router />}
      </Provider>
    </GestureHandlerRootView>

  );
}
