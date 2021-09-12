import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// Auth import
import AppTabsNavigator from './Dashbord/AppTabsNavigator';
import AuthStack from './AuthStack';
import DashboardStack from './DashboardStack';
//import AuthStackAthlete from './AuthStackAthlete';
import SplashStack from './SplashStack';
import DashboardStackAtlhete from './DashboardStackAthlete';
const App = createSwitchNavigator(
  {
    Entry:SplashStack,
    Auth: AuthStack,
    DashboardStack:DashboardStack,
    DashboardStackAtlhete:DashboardStackAtlhete,
    
  },
  {
    initialRouteName:'Entry',
  },
);

export default createAppContainer(App);
