import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import AuthEntry from '../screens/Auth/index';

import LoginAthlete from '../AtlheteScreens/Auth/LoginAthlete';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';
import SplashAuth from '../screens/SplashAuth';
import AuthStack from './AuthStack';
import AuthStackAthlete from './AuthStackAthlete';

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
    SwitchAppAuth:{
        screen:SplashAuth,
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

    AuthCoach: {
      screen: AuthStack,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },

    },
    AuthAthlete: {
      screen: AuthStackAthlete,
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