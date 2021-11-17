import { createStackNavigator } from 'react-navigation-stack';
import HomeAthleteScreen from '../../AtlheteScreens/HomeAthleteScreen/HomeAthleteScreen';
import Notifications from '../../AtlheteScreens/Notifications';
import myInformationsAthleteScreen from '../../AtlheteScreens/myInformationAthlete/myInformationsAthleteScreen';
import AccountScreen from '../../AtlheteScreens/AccountScreen/AccountScreen';

const HomeStack = createStackNavigator(
  {
    HomeAthleteScreen: {
      screen: HomeAthleteScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    Notifications: {
      screen: Notifications,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        headerVisible: false,
        animationEnabled: true,
      },
    },
    myInformationsAthleteScreen: {
      screen: myInformationsAthleteScreen,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        headerVisible: false,
        animationEnabled: true,
      },
    },
    AccountScreen: {
      screen: AccountScreen,
      navigationOptions: {
        headerShown: false,
        tabBarVisible: false,
        headerVisible: false,
        animationEnabled: true,
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
