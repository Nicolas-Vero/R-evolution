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
    // Loading: EntryScreen,
   //App: AppTabsNavigator,
    Entry:SplashStack,
    Auth: AuthStack,
    //AuthAtlhete:AuthStackAthlete,
    DashboardStack:DashboardStack,
    DashboardStackAtlhete:DashboardStackAtlhete,
    
  },
  {
    initialRouteName:'Entry',
  },
);

export default createAppContainer(App);
