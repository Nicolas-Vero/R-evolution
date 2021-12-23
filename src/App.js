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

const { store } = configureStore();

const Navigation = createAppContainer(Router);
import AppNavigation from './routes/navigationService';

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
    //  this.registerForPushNotification();
    // this.lockScreenOrientation();
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('[Notification]', notification);
        this.sendNotificationImmediately();
      },
    );

    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('[Notification-Response]', response);
        this.sendNotificationImmediately();
      });
  }

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
// import { Sentry } from 'react-native-sentry';

// Sentry.config('https://98def6268ecd4527885aa1358d0ec0d0@sentry.io/1434821').install();

// export default class App extends Component {

//   render() {
//     return (
//       <AppContainer/>
//     );
//   }
// }
