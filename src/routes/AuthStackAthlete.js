import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import LoginAthlete from '../AtlheteScreens/Auth/LoginAthlete';
import RegisterInfoAthlete from '../AtlheteScreens/Auth/RegisterInfoAthlete';
import MoreInfoAthlete from '../AtlheteScreens/Auth/MoreInfoAthlete'; 
import mensuration from '../components/componentsAthlete/mensuration';
import ElementSlider from '../components/componentsAthlete/ElementSlider';
import dynamicListAthlete from '../components/componentsAthlete/dynamicListAthlete';
import health from '../components/componentsAthlete/health';
import selectList from '../components/componentsAthlete/selectList';
import ElementSlider2 from '../components/componentsAthlete/ElementSlider2';
import avatarAthlete from '../components/componentsAthlete/avatarAthlete';
// Auth bottom tabs menu
const AuthStackAthlete = createStackNavigator(
  {
    LoginAthlete: {
      screen: LoginAthlete,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    RegisterInfoAthlete: {
      screen: RegisterInfoAthlete,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    MoreInfoAthlete: {
      screen: MoreInfoAthlete,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},

    mensuration: {
      screen: mensuration,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},
    ElementSlider: {
      screen: ElementSlider,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},
      dynamicListAthlete: {
      screen: dynamicListAthlete,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},
      health: {
      screen: health,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},
      selectList: {
      screen: selectList,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},
      ElementSlider2: {
      screen: ElementSlider2,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},
      avatarAthlete: {
      screen: avatarAthlete,
      navigationOptions: {
        gestureEnabled:false,
        headerShown: false,
        swipeEnabled: false,
      },},
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