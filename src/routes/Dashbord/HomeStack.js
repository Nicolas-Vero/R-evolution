import { createStackNavigator } from 'react-navigation-stack';
import pendingRequestCoachScreen from '../../screens/pendingRequestCoach/pendingRequestCoachScreen';
// import MyInformations from '../../screens/MyInformations';
import Demande from '../../screens/Demande';
import homeCoachScreen from '../../screens/homeCoach/homeCoachScreen';
import createBookCoachScreen from '../../screens/createBookCoach/createBookCoachScreen';
import activitiesCoachScreen from '../../screens/activitiesCoach/activitiesCoachScreen';
import createReminderCoachScreen from '../../screens/createReminderCoach/createReminderCoachScreen';
import accountScreen from '../../screens/account/accountScreen';
import profileCoachScreen from '../../screens/profileCoach/profileCoachScreen';
import treshRequestCoachScreen from '../../screens/trestRequestCoach/trestRequestCoachScreen';
const getTabBarVisiblility = (navigation) => {
  const route = navigation.state.routeName;
  console.log(route);
  const test = ['homeCoachScreen'].includes(route);

  console.log(test);

  return test;
};
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
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: false,
        headerShown: false,
        tabBarVisible: getTabBarVisiblility(navigation),
      }),
      // navigationOptions: {
      //   gestureEnabled: false,
      //   headerShown: false,
      //   swipeEnabled: false,
      // },
    },
    createReminderCoachScreen: {
      screen: createReminderCoachScreen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: false,
        headerShown: false,
        tabBarVisible: getTabBarVisiblility(navigation),
      }),
    },
    activitiesCoachScreen: {
      screen: activitiesCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    accountScreen: {
      screen: accountScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    profileCoachScreen: {
      screen: profileCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    pendingRequestCoachScreen: {
      screen: pendingRequestCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    treshRequestCoachScreen: {
      screen: treshRequestCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
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
