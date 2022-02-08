import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './routes/index';
import './config/logger';
import { createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
const { store } = configureStore();
import AuthService from './services/AuthService';
import AppNavigation from './routes/navigationService';
import { set_expo_token, get_coach_me } from './api/Coach';
import { get_athlete_me } from './api/Athlete';
import ContextService from './services/ContextService';
import { get_request_by_athlete_id } from './api/Request';

const Navigation = createAppContainer(Router);

export class App extends Component {
  constructor(props) {
    super(props);

    if (store === null) {
      store = configureStore();
    }

    this.state = {
      store,
    };
  }

  state = {
    loaded: true,
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
    await Font.loadAsync({
      MontserratBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
      MontserratBoldItalic: require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
      MontserratItalic: require('../assets/fonts/Montserrat-Italic.ttf'),
      MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
      MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
      Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
      Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
      RobotoItalic: require('../assets/fonts/Roboto-LightItalic.ttf'),
      RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
      RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    }).then(() => {
      this.setState({ loaded: true });
    });

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
    return (
      <Provider store={this.state.store}>
        {!this.state.loaded ? <ActivityIndicator /> : <Navigation />}
      </Provider>
    );
  }
}

export default App;
