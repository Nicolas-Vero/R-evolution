import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import LoginAthlete from '../AtlheteScreens/Auth/LoginAthlete';

// Auth bottom tabs menu
const AuthStackAthlete = createStackNavigator(
  {
    Login: {
      screen: LoginAthlete,
      navigationOptions: {
        tabBarLabel: 'Sign in',
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },
    },
    // RegisterInfo: {
    //   screen: RegisterInfo,
    //   navigationOptions: {
    //     tabBarLabel: 'Sign up',
    //     tabBarIcon: ({tintColor}) => (
    //       <Ionicons  size={20} color={tintColor} />
    //     ),
    //     header: null,
    //   },
    // },
    // MoreInfo: {
    //   screen: MoreInfo,
    //   navigationOptions: {
    //     tabBarLabel: 'Sign up',
    //     tabBarIcon: ({tintColor}) => (
    //       <Ionicons  size={20} color={tintColor} />
    //     ),
    //     header: null,
    //   },
    // },
    // AddAvatar: {
    //   screen: AddAvatar,
    //   navigationOptions: {
    //     tabBarLabel: 'Sign up',
    //     tabBarIcon: ({tintColor}) => (
    //       <Ionicons  size={20} color={tintColor} />
    //     ),
    //   },
    // },
    // RegisterInfo: {
    //   screen: RegisterInfo,
    //   navigationOptions: {
    //     tabBarLabel: 'Sign up',
    //     tabBarIcon: ({tintColor}) => (
    //       <Ionicons  size={20} color={tintColor} />
    //     ),
    //     header: null,
    //   },
    // },

  },
  {
    lazy: true,
    initialRouteName: 'Login',
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
export default AuthStackAthlete;