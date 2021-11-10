import { createSwitchNavigator } from 'react-navigation';
import DashboardStack from './DashboardStack';
import DashboardStackAtlhete from './DashboardStackAthlete';
import AppLauncher from './AppLauncher/AppLauncher';
import AuthStack from './AuthStack';
export default createSwitchNavigator(
  {
    AppLauncher: AppLauncher,
    Entry: AuthStack,
    DashboardStack: DashboardStack,
    DashboardStackAtlhete: DashboardStackAtlhete,
  },
  {
    initialRouteName: 'AppLauncher',
  },
);
