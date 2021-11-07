import { createStackNavigator } from 'react-navigation-stack';
// Auth import
import loginScreen from '../screens/Auth/login/loginScreen';

import registerScreen from '../screens/register/common/register/registerScreen';
import mensurationScreen from '../screens/register/athlete/mensuration/mensurationScreen';
import experienceScreen from '../screens/register/athlete/experience/experienceScreen';
import goalScreen from '../screens/register/athlete/goal/goalScreen';
import healthScreen from '../screens/register/athlete/health/healthScreen';
import selectGymScreen from '../screens/register/athlete/selectGym/selectGymScreen';
import trainingDayScreen from '../screens/register/athlete/trainingDay/trainingDayScreen';
import selectCoachScreen from '../screens/register/athlete/selectCoach/selectCoachScreen';
import avatarScreen from '../screens/register/common/avatar/avatarScreen';
// Auth bottom tabs menu
const AuthStackAthlete = createStackNavigator(
  {
    loginScreen: {
      screen: loginScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    registerScreen: {
      screen: registerScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    mensurationScreen: {
      screen: mensurationScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    experienceScreen: {
      screen: experienceScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    goalScreen: {
      screen: goalScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    healthScreen: {
      screen: healthScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    selectGymScreen: {
      screen: selectGymScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    trainingDayScreen: {
      screen: trainingDayScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    selectCoachScreen: {
      screen: selectCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    avatarScreen: {
      screen: avatarScreen,
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
