import { createStackNavigator } from 'react-navigation-stack';
import HomeStack from './DashbordAthlete/HomeStack';
import OffresStack from './DashbordAthlete/OffresStack';
import AthletesStack from './DashbordAthlete/AthletesStack';
import AppTabsNavigator from './DashbordAthlete/AppTabsNavigator';

const DashboardStackAtlhete = createStackNavigator(
  {
    AppTabsNavigator: AppTabsNavigator,
    HomeStack: HomeStack,
    OffreStack: OffresStack,
    AthletesStack: AthletesStack,
  },
  {
    initialRouteName: 'AppTabsNavigator',
    headerMode: 'none',
  },
);

export default DashboardStackAtlhete;
