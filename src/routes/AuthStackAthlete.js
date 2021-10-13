import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import LoginAthlete from '../AtlheteScreens/Auth/LoginAthlete';
import RegisterInfoAthlete from '../AtlheteScreens/Auth/RegisterInfoAthlete';
import MoreInfoAthlete from '../AtlheteScreens/Auth/MoreInfoAthlete';

// Auth bottom tabs menu
const AuthStackAthlete = createStackNavigator(
  {
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
    RegisterInfoAthlete: {
      screen: RegisterInfoAthlete,
      navigationOptions: {
        gestureEnabled:false,
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
      },
    },
    MoreInfoAthlete: {
      screen: MoreInfoAthlete,
      navigationOptions: {
        gestureEnabled:false,
        tabBarLabel: 'Sign up',
        headerShown: false,
      },
    },
  },
  {
    lazy: true,
    initialRouteName: 'RegisterInfoAthlete',
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
export default AuthStackAthlete;