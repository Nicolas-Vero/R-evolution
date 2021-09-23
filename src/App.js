import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import Router from './routes/index';
import AppNavigation from './routes/navigationService';
import './config/logger';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as ScreenOrientation from 'expo-screen-orientation';
const { persistor, store } = configureStore();

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

  async registerForPushNotification() {
    let token = null;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    console.log('[push-token]', token);
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    // return token;
  }
  async  lockScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  componentDidMount() {
    this.registerForPushNotification();
    this.lockScreenOrientation();
    // this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
    //   console.log('[Notification]', notification);
    // });

    // this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log('[Notification-Response]', response);
    // });
  }

  // componentWillUnmount () {
  //   Notifications.removeNotificationSubscription(this.notificationListener);
  //   Notifications.removeNotificationSubscription(this.responseListener);
  // }

  render() {
    const { store } = this.state;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <Router
              ref={(navigatorRef) => {
                AppNavigation.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </PersistGate>
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
