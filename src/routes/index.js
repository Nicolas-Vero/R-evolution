import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import DashboardScreen from '../screens/dashboard/index';
import SignInScreen from '../screens/signIn/index';
import SignUpScreen from '../screens/signUp/index';

import { IconCommunity, IconSimpleLine } from '@expo/vector-icons';
import CustomMainTabBar from '../components/nav/customMainTabBar';

// Auth bottom tabs menu
const AuthTabsNavigator = createMaterialTopTabNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <IconSimpleLine name="login" size={20} color={tintColor} />
        ),
      },
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <IconSimpleLine name="user-follow" size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    lazy: true,
    initialRouteName: 'SignIn',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: true,
      animationEnabled: true,
    },
    tabBarComponent: props => <CustomMainTabBar {...props} main={false} />,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      showIcon: true,
      allowFontScaling: false,
    },
  },
);

// Main app bottom tabs menu
const AppTabsNavigator = createMaterialTopTabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
          <IconCommunity name="home" size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    lazy: true,
    initialRouteName: 'Dashboard',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: true,
      animationEnabled: true,
    },
    tabBarComponent: props => <CustomMainTabBar {...props} main={true} />,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      showIcon: true,
      allowFontScaling: false,
    },
  },
);

const App = createSwitchNavigator(
  {
    // Loading: EntryScreen,
    App: AppTabsNavigator,
    Auth: AuthTabsNavigator,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(App);
