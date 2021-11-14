import { createStackNavigator } from 'react-navigation-stack';
import homeAthleteScreen from '../../AtlheteScreens/homeAthlete/homeAthleteScreen';
import AccountAthlete from '../../AtlheteScreens/AccountAthlete/AccountAthlete';
import Notifications from '../../AtlheteScreens/Notifications';
import myInformationsAthleteScreen from '../../AtlheteScreens/myInformationAthlete/myInformationsAthleteScreen';

const HomeStack = createStackNavigator(
  {
    homeAthleteScreen: {
      screen: homeAthleteScreen,
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
    AccountAthlete: {
      screen: AccountAthlete,
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
