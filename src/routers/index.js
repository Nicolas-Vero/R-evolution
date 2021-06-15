import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthStack from './AuthStack';
//import Splash from '../screens/Introduction/Splash';
//import Test from '../screens/Test';
//import DashboardStack from "./DashboardStack";
//import Test1 from "../screens/Test1";

const Router = createSwitchNavigator(
  {

    // @testing
   // Test: Test,

    // @application
  //  Splash: Splash,
    Auth:AuthStack,
    //DashboardStack: DashboardStack,
  },
  {
    initialRouteName: 'Auth',
    headerMode:"none"
  }
);

const AppContainer = createAppContainer(Router);

export default AppContainer;
