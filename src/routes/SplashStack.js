import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import AuthEntry from '../screens/Auth/index';
import Activitie from '../screens/Activitie';
import LoginAthlete from '../AtlheteScreens/Auth/LoginAthlete';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';
import SplashAuth from '../screens/SplashAuth';
import AuthStack from './AuthStack';
import AuthStackAthlete from './AuthStackAthlete';
import RegisterInfo from '../screens/Auth/RegisterInfo';
import RegisterInfoAthlete from '../AtlheteScreens/Auth/RegisterInfoAthlete';

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
        gestureEnabled:false,
      },
    },
    RegisterInfoAthlete: {
      screen: RegisterInfoAthlete,
      navigationOptions: {
        headerShown: false,
        gestureEnabled:false,
      },
    },

    SwitchApp:{
        screen:Splash,
        navigationOptions: {
            headerShown: false,
          },
    },
    SwitchAppAuth:{
        screen:SplashAuth,
        navigationOptions: {
            tabBarLabel: 'Sign in',
            tabBarIcon: ({tintColor}) => (
              <Ionicons  size={20} color={tintColor} />
            ),
            headerShown: false,
          },
    },

    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
      },

    },

    LoginAthlete: {
      screen: LoginAthlete,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
      },
    },

    AuthCoach: {
      screen: AuthStack,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
      },

    },
    AuthAthlete: {
      screen: AuthStackAthlete,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
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
      gestureEnabled:false,
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