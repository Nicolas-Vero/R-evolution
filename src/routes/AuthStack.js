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
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
      },
    },
    SwitchAppAuth:{
      screen:SplashAuth,
      navigationOptions: {
          tabBarLabel: 'Sign up',
          tabBarIcon: ({tintColor}) => (
            <Ionicons  size={20} color={tintColor} />
          ),
          headerShown: false,
        },},

    RegisterInfo: {
      screen: RegisterInfo,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
      },
    },
    MoreInfo: {
      screen: MoreInfo,
      navigationOptions: {
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