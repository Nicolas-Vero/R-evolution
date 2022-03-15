import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
// import { PersistGate } from 'redux-persist/integration/react';
import { store } from './redux/store';

import Router from './routes/index';
import './config/logger';
import { createAppContainer } from 'react-navigation';
import * as Notifications from 'expo-notifications';
import * as Updates from 'expo-updates';
import AuthService from './services/AuthService';
import { get_coach_me } from './api/Coach';
import { get_athlete_me } from './api/Athlete';
import ContextService from './services/ContextService';
import { get_request_by_athlete_id } from './api/Request';
import { loadFonts } from './configs/design/font';

// import configureStore from './store/configureStore';
// const { store } = configureStore();
const Navigation = createAppContainer(Router);

export class App extends Component {
  constructor(props) {
    super(props);

    // if (store === null) {
    //   store = configureStore();
    // }

    this.state = {
      store,
    };
  }

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
    this.lockScreenOrientation();
    this.setState({ loaded: true });

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

  async lockScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
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
    return (
      <Provider store={this.state.store}>
        {!this.state.loaded ? <ActivityIndicator /> : <Navigation />}
      </Provider>
    );
  }
}

export default App;
