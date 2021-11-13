import { createStackNavigator } from 'react-navigation-stack';
import pendingRequestCoachScreen from '../../screens/pendingRequestCoach/pendingRequestCoachScreen';
// import MyInformations from '../../screens/MyInformations';
import Demande from '../../screens/Demande';
import homeCoachScreen from '../../screens/homeCoach/homeCoachScreen';
import createBookCoachScreen from '../../screens/createBookCoach/createBookCoachScreen';
import activitiesScreen from '../../screens/ActivitiesCoach/ActivitiesScreen';
import createReminderCoachScreen from '../../screens/createReminderCoach/createReminderCoachScreen';
import accountScreen from '../../screens/account/accountScreen';
import profileCoachScreen from '../../screens/profileCoach/profileCoachScreen';
const HomeStack = createStackNavigator(
  {
    homeCoachScreen: {
      screen: homeCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    createBookCoachScreen: {
      screen: createBookCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    createReminderCoachScreen: {
      screen: createReminderCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    activitiesScreen: {
      screen: activitiesScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    accountScreen: {
      screen: accountScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    profileCoachScreen: {
      screen: profileCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    pendingRequestCoachScreen: {
      screen: pendingRequestCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    Demande: {
      screen: Demande,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
  },
  {
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
  },
);

export default HomeStack;
