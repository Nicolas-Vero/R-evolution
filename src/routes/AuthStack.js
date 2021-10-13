import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import RegisterInfo from '../screens/Auth/RegisterInfo';
import MoreInfo from '../screens/Auth/MoreInfo';
import Login from '../screens/Auth/Login';
import SplashAuth from '../screens/SplashAuth';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    SplashAuth:{
      screen:SplashAuth,
      navigationOptions: {
          headerShown: false,
        },},

    RegisterInfo: {
      screen: RegisterInfo,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    MoreInfo: {
      screen: MoreInfo,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
      },
    },


  },
  {
    lazy: true,
    initialRouteName: 'RegisterInfo',
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: false,
      gestureEnabled:false,
      headerVisible: false,
      animationEnabled: true,
      swipeEnabled: false,
    },
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      showIcon: true,
      allowFontScaling: false,
    },
  },
); 
export default AuthStack;