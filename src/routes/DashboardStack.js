import { createStackNavigator } from 'react-navigation-stack';
import AppTabsNavigator from './Dashbord/AppTabsNavigator';
import HomeStack from './Dashbord/HomeStack';
import OffresStack from './Dashbord/OffresStack';
import MyAthletesStack from './Dashbord/MyAthletesStack';

const DashboardStack = createStackNavigator(
  {
    AppTabsNavigator: AppTabsNavigator,
    HomeStack: HomeStack,
    OffreStack: OffresStack,
    MyAthletesStack: MyAthletesStack,
  },
  {
    initialRouteName: 'AppTabsNavigator',
    headerMode: 'none',
  },
);

export default DashboardStack;
