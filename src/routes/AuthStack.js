import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AddAvatar from '../components/AddAvatar';
import { Ionicons } from '@expo/vector-icons';
import RegisterInfo from '../screens/Auth/RegisterInfo';
import MoreInfo from '../screens/Auth/MoreInfo';
// Auth import
import AuthEntry from '../screens/Auth/index';
import Login from '../screens/Auth/Login';

// Auth bottom tabs menu
const AuthStack = createStackNavigator(
  {
    AuthEntry: {
      screen: AuthEntry,
      navigationOptions: {
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
    RegisterInfo: {
      screen: RegisterInfo,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },
    },
    MoreInfo: {
      screen: MoreInfo,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },
    },
    AddAvatar: {
      screen: AddAvatar,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
      },
    },
    RegisterInfo: {
      screen: RegisterInfo,
      navigationOptions: {
        tabBarLabel: 'Sign up',
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
export default AuthStack;