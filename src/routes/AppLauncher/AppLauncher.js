import React from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import AuthService from '../../services/AuthService';
import ContextService from '../../services/ContextService';
import styles from './AppLauncherStyle';
import LoggerService from '../../services/LoggerService';

export default class AppLauncher extends React.Component {
  constructor(props) {
    super(props);
    this.initApp();
  }

  state = {
    loaded: false,
  };

  initApp = async () => {
    // eslint-disable-next-line no-console
    console.info('--- Init App ---');
    LoggerService.init();

    // await AuthService.init();
    // await AuthService.removeAuth();
    const auth = await AuthService.getAuth();
    ContextService.set('current_navigation', this.props.navigation);
    const navigation = ContextService.get('current_navigation');
    let stack = 'Entry';
    if (auth) {
      stack =
        auth.user.type === 'coach' ? 'DashboardStack' : 'DashboardStackAthlete';
    }

    navigation.navigate(stack);
  };

  render = () => {
    return (
      <View style={styles.flex}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#BB1D26" />
          <StatusBar barStyle="dark-content" backgroundColor="#212121" />
        </View>
        <View style={styles.flex} />
      </View>
    );
  };
}
