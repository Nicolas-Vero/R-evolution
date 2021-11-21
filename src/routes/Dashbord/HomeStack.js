import { createStackNavigator } from 'react-navigation-stack';
import PendingRequestCoachScreen from '../../screens/PendingRequestCoachScreen/PendingRequestCoachScreen';
// import MyInformations from '../../screens/MyInformations';
import HomeCoachScreen from '../../screens/HomeCoachScreen/HomeCoachScreen';
// import activitiesCoachScreen from '../../screens/activitiesCoach/activitiesCoachScreen';
import AccountScreen from '../../screens/AccountScreen/AccountScreen';
import TreshRequestCoachScreen from '../../screens/TreshRequestCoachScreen/TreshRequestCoachScreen';
import ProfileCoachScreen from '../../screens/ProfileCoachScreen/ProfileCoachScreen';
import ActivitiesCoachScreen from '../../screens/ActivitiesCoachScreen/ActivitiesCoachScreen';
import CreateReminderCoachScreen from '../../screens/CreateReminderCoachScreen/CreateReminderCoachScreen';
import CreateBookCoachScreen from '../../screens/CreateBookCoachScreen/CreateBookCoachScreen';
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
      screen: HomeCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    CreateBookCoachScreen: {
      screen: CreateBookCoachScreen,
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
    CreateReminderCoachScreen: {
      screen: CreateReminderCoachScreen,
      navigationOptions: ({ navigation }) => ({
        gestureEnabled: false,
        headerShown: false,
        tabBarVisible: getTabBarVisiblility(navigation),
      }),
    },
    ActivitiesCoachScreen: {
      screen: ActivitiesCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    AccountScreen: {
      screen: AccountScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    ProfileCoachScreen: {
      screen: ProfileCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    PendingRequestCoachScreen: {
      screen: PendingRequestCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    TreshRequestCoachScreen: {
      screen: TreshRequestCoachScreen,
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
