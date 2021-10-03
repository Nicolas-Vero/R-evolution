import { createStackNavigator } from 'react-navigation-stack';
import DashboardAthlete from '../../AtlheteScreens/DashboardAthlete';
import AccountAthlete from '../../AtlheteScreens/AccountAthlete';
import Notifications from '../../AtlheteScreens/Notifications';
import MyInformationsAthlete from '../../AtlheteScreens/MyInformationsAthlete';

const HomeStack = createStackNavigator(
  {
    DashboardAthlete: {
      screen: DashboardAthlete,
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
    MyInformationsAthlete: {
      screen: MyInformationsAthlete,
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
