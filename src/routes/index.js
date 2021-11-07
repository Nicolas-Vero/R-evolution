import { createSwitchNavigator } from 'react-navigation';
import AuthStack from './AuthStack';
import DashboardStack from './DashboardStack';
import SplashStack from './SplashStack';
import DashboardStackAtlhete from './DashboardStackAthlete';
import AppLauncher from './AppLauncher/AppLauncher';
export default createSwitchNavigator(
  {
    AppLauncher: AppLauncher,
    Entry: SplashStack,
    Auth: AuthStack,
    DashboardStack: DashboardStack,
    DashboardStackAtlhete: DashboardStackAtlhete,
  },
  {
    initialRouteName: 'AppLauncher',
  },
);
