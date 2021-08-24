import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
import DashboardAthlete from '../../AtlheteScreens/DashboardAthlete';

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
  },
  {
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
  },
);

export default HomeStack;
