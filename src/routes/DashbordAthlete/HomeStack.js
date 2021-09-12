import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
import DashboardAthlete from '../../AtlheteScreens/DashboardAthlete';
import AccountAthlete from '../../AtlheteScreens/AccountAthlete';

const HomeStack = createStackNavigator(
  {
    DashboardAthlete: {
      screen: DashboardAthlete,
      navigationOptions: {
        header: null,
      },
    },
    
    Activite: {
      screen: Activite,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        headerVisible: false,
        animationEnabled: true,
      },
    },
    AccountAthlete: {
      screen: AccountAthlete,
      navigationOptions: {
        header: null,
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
