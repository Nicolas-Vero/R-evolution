import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// import DashboardScreen from '../screens/dashboard/index';
// import SignInScreen from '../screens/signIn/index';
// import SignUpScreen from '../screens/signUp/index';

import { IconCommunity, Ionicons } from '@expo/vector-icons';
import CustomMainTabBar from '../components/nav/customMainTabBar';
import AddSpecialities from '../screens/Auth/AddSpecialities';

// Auth bottom tabs menu
const AuthTabsNavigator = createMaterialTopTabNavigator(
  {
    SignIn: {
      screen: AddSpecialities,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
      },
    },
    SignUp: {
      screen: AddSpecialities,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    lazy: true,
    initialRouteName: 'SignUp',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: true,
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

// Main app bottom tabs menu
const AppTabsNavigator = createMaterialTopTabNavigator(
  {
    Dashboard: {
      screen: AddSpecialities,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
      },
    },
  },
  {
    lazy: true,
    initialRouteName:'Dashboard',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: true,
      animationEnabled: true,
    },
   // tabBarComponent: props => <CustomMainTabBar {...props} main={true} />,
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
    initialRouteName:'Auth',
  },
);

export default createAppContainer(App);
