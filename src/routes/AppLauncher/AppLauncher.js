import React, { Component } from 'react';
import { ActivityIndicator, View, Platform, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import configureStore from '../../store/configureStore';
// import './config/logger';
import * as Notifications from 'expo-notifications';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Updates from 'expo-updates';
const { store } = configureStore();
import AuthService from '../../services/AuthService';
import ContextService from '../../services/ContextService';
import styles from './AppLauncherStyle';

export default class AppLauncher extends React.Component {
  constructor(props) {
    super(props);

    if (store === null) {
      store = configureStore();
    }
    this.state = {
      store,
    };
    this.initApp();
  }

  state = {
    loaded: false,
  };

  initApp = async () => {
    // eslint-disable-next-line no-console
    console.info('--- Init App ---');

    // await AuthService.init();
    // await AuthService.removeAuth();
    const auth = await AuthService.getAuth();
    ContextService.set('current_navigation', this.props.navigation);
    console.log('auth', auth);
    const navigation = ContextService.get('current_navigation');
    let stack = 'Entry';
    if (auth) {
      stack = auth.user.type = 'coach'
        ? 'DashboardStack'
        : 'DashboardStackAtlhete';
    }
    navigation.navigate(stack);
  };

  render = () => {
    return (
      <View style={styles.flex}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#BB1D26" />
          <StatusBar barStyle="default" />
        </View>
        <View style={styles.flex} />
      </View>
    );
  };
}
