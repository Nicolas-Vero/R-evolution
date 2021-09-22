import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
import DashboardAthlete from '../../AtlheteScreens/DashboardAthlete';
import AccountAthlete from '../../AtlheteScreens/AccountAthlete';
import Notifications from '../../AtlheteScreens/Notifications';

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
