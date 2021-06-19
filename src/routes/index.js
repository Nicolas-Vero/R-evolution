import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// import DashboardScreen from '../screens/dashboard/index';
// import SignInScreen from '../screens/signIn/index';
// import SignUpScreen from '../screens/signUp/index';

import AddGym from '../screens/Auth/AddGym';
import AddPhoto from '../screens/Auth/AddPhoto';
import AddSpecialities from '../screens/Auth/AddSpecialities';
import AddXp from '../screens/Auth/AddXp';
import { IconCommunity, Ionicons } from '@expo/vector-icons';
import CustomMainTabBar from '../components/nav/customMainTabBar';
import RegisterInfo from '../screens/Auth/RegisterInfo';
import Login from '../screens/Auth/Login';
import AddDegrees from '../screens/Auth/AddDegrees';

// Auth bottom tabs menu
const AuthTabsNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Sign in',
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
      },
    },
    AddSpecialities: {
      screen: AddSpecialities,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
      },
    },

    AddDegrees: {
      screen: AddDegrees,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
      },
    },

    AddXp: {
      screen: AddXp,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
      },
    },

    AddPhoto: {
      screen: AddPhoto,
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
    initialRouteName: 'RegisterInfo',
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
