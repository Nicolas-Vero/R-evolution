import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import AuthEntry from '../screens/Auth/index';
import Splash from '../screens/Splash';
import loginScreen from '../screens/Auth/login/loginScreen';
import SplashAuth from '../screens/SplashAuth';
import AuthStack from './AuthStack';
import AuthStackAthlete from './AuthStackAthlete';
import RegisterInfo from '../screens/Auth/RegisterInfo';
import RegisterInfoAthlete from '../AtlheteScreens/Auth/RegisterInfo/RegisterInfoAthlete';

// Auth bottom tabs menu
const SplashStack = createStackNavigator(
  {
    AuthEntry: {
      screen: AuthEntry,
      navigationOptions: {
        headerShown: false,
      },
    },
    RegisterInfo: {
      screen: RegisterInfo,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    RegisterInfoAthlete: {
      screen: RegisterInfoAthlete,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },

    SwitchApp: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      },
    },
    SwitchAppAuth: {
      screen: SplashAuth,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },

    loginScreen: {
      screen: loginScreen,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },

    AuthCoach: {
      screen: AuthStack,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    AuthAthlete: {
      screen: AuthStackAthlete,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
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
      gestureEnabled: false,
      swipeEnabled: false,
      animationEnabled: true,
    },

    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      showIcon: true,
      allowFontScaling: false,
    },
  },
);
export default SplashStack;
