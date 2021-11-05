import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import LoginAthlete from '../AtlheteScreens/Auth/LoginAthlete';
import RegisterInfoAthlete from '../AtlheteScreens/Auth/RegisterInfo/RegisterInfoAthlete';
import MoreInfoAthlete from '../AtlheteScreens/Auth/MoreInfoAthlete';
import mensuration from '../components/componentsAthlete/mensuration/mensuration';
import experience from '../components/componentsAthlete/experience/experience';
import dynamicListAthlete from '../components/componentsAthlete/dynamicListAthlete';
import health from '../components/componentsAthlete/health/health';
import selectList from '../components/componentsAthlete/selectList';
import ElementSlider2 from '../components/componentsAthlete/ElementSlider2';
import avatarAthlete from '../components/componentsAthlete/avatarAthlete';
import goal from '../components/componentsAthlete/goal/goal';
import gym from '../components/componentsAthlete/gym/gym';
import trainingDay from '../components/componentsAthlete/trainingDay/trainingDay';
import selectCoach from '../components/componentsAthlete/selectCoach/selectCoach';

// Auth bottom tabs menu
const AuthStackAthlete = createStackNavigator(
  {
    LoginAthlete: {
      screen: LoginAthlete,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    RegisterInfoAthlete: {
      screen: RegisterInfoAthlete,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    mensuration: {
      screen: mensuration,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    experience: {
      screen: experience,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    goal: {
      screen: goal,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    health: {
      screen: health,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    gym: {
      screen: gym,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    trainingDay: {
      screen: trainingDay,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    selectCoach: {
      screen: selectCoach,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    avatarAthlete: {
      screen: avatarAthlete,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
  },
  {
    lazy: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: false,
      headerVisible: false,
      gestureEnabled: false,
      swipeEnabled: false,
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
export default AuthStackAthlete;
