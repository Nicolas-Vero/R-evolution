import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import AuthEntry from '../screens/Auth/index';

import LoginAthlete from '../AtlheteScreens/Auth/LoginAthlete';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';

// Auth bottom tabs menu
const SplashStack = createStackNavigator(
  {
    AuthEntry: {
      screen: AuthEntry,
      navigationOptions: {
        header: null,
      },
    },

    SwitchApp:{
        screen:Splash,
        navigationOptions: {
            tabBarLabel: 'Sign in',
            tabBarIcon: ({tintColor}) => (
              <Ionicons  size={20} color={tintColor} />
            ),
            header: null,
          },
    },

    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },

    },

    LoginAthlete: {
      screen: LoginAthlete,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },

    },

  },
  {
    lazy: true,
    initialRouteName: 'AuthEntry',
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: false,
      headerVisible: false,
      swipeEnabled: false,
      animationEnabled: true,
    },
 //   tabBarComponent: props => <CustomMainTabBar {...props} main={false} />,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      showIcon: true,
      allowFontScaling: false,
    },
  },
); 
export default SplashStack;