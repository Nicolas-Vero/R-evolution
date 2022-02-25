import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import configureStore from './store/configureStore';
// const { store } = configureStore();
import Router from './routes/index';
import './config/logger';
import { createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as Updates from 'expo-updates';
import AuthService from './services/AuthService';
import { get_coach_me } from './api/Coach';
import { get_athlete_me } from './api/Athlete';
import ContextService from './services/ContextService';
import { get_request_by_athlete_id } from './api/Request';
import { store, persistor } from './redux/store';
import { loadFonts } from './configs/design/font';
const Navigation = createAppContainer(Router);

export class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loaded: false,
  };

  async componentDidMount() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        Updates.reloadAsync();
      }
    } catch (e) {
      // handle or log error
    }
    await loadFonts();

    const auth = await AuthService.getAuth();
    if (auth) {
      await this.scheduleNotification();

      const { type } = auth.user;
      let user;
      if (type === 'coach') {
        user = await get_coach_me();
      } else if (type === 'athlete') {
        user = await get_athlete_me();
      }

      if (user) {
        await AuthService.setUser(user.data);
        await AuthService.checkExpoToken();
      }
    }

    this.setState({ loaded: true });

    // // this.lockScreenOrientation();
    this.notificationListener = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const { type } = notification.request.content.data;
        if (type === 'ATHLETE_REQUEST_PROCESS') {
          const user = await get_athlete_me();
          if (user) {
            await AuthService.setUser(user.data);
          }
        }
      },
    );

    this.responseListener =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          await this.processNotification(response);
        },
      );
  }

  processNotification = async (data) => {
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
        screen = 'DashboardCoachScreen';
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
        break;
    }
    if (screen) {
      await navigation.navigate(screen, { item });
    }
  };

  scheduleNotification = async (value) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  componentWillUnmount() {
    Notifications.removeNotificationSubscription(this.notificationListener);
    Notifications.removeNotificationSubscription(this.responseListener);
  }

  render() {
    const { loaded } = this.state;
    return !loaded ? (
      <ActivityIndicator />
    ) : (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
