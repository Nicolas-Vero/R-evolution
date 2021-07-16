import React from 'react';
import {Image} from 'react-native'
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
import Dashboard from '../screens/Dashboard'
// Auth import
import AuthEntry from '../screens/Auth/index';
import Login from '../screens/Auth/Login';
import AddDegrees from '../screens/Auth/AddDegrees';

// Auth bottom tabs menu
const AuthTabsNavigator = createStackNavigator(
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
    Register: {
      screen: RegisterInfo,
      navigationOptions: {
        tabBarLabel: 'Sign up',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
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
    initialRouteName: 'AuthEntry',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: false,
      headerVisible: false,
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
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
         <Image source={require('../../assets/images/Calendar.png')}
                style={{height: 24, resizeMode: 'contain', tintColor}}
         />
        ),
      },
    },
    offres: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
          <Image source={require('../../assets/images/Category.png')}
          style={{height: 24, resizeMode: 'contain', tintColor}}
   />
        ),
      },
    },
    users: {
      screen: Login,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
          <Image source={require('../../assets/images/User.png')}
          style={{height: 24, resizeMode: 'contain', tintColor}}
   />
        ),
      },
    },
    stat: {
      screen: Login,
      navigationOptions: {

        tabBarIcon: ({tintColor}) => (
          <Image source={require('../../assets/images/Chart.png')}
                style={{height: 24, resizeMode: 'contain', tintColor}}
         />
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
      tabBarVisible: false,
      animationEnabled: true,
    },
   // tabBarComponent: props => <CustomMainTabBar {...props} main={true} />,
    tabBarOptions: {
      activeTintColor: '#2CDEE4',
      inactiveTintColor: 'grey',
      showIcon: true,
      showLabel: false,
      allowFontScaling: false,
      style:{backgroundColor:'#2D333C'}
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
    initialRouteName:'App',
  },
);

export default createAppContainer(App);
