import { createStackNavigator } from 'react-navigation-stack';
import Activitie from '../../screens/Activitie'; //athlet activite screen
import AwaitingDemand from '../../screens/AwaitingDemand';
import CreateBook from '../../screens/CreateBook';
import Dashboard from '../../screens/Dashboard';
import homeCoachScreen from '../../screens/homeCoach/homeCoachScreen';
import CreateReminder from '../../screens/CreateReminder';
import Account from '../../screens/Account';
import MyInformations from '../../screens/MyInformations';
import Demande from '../../screens/Demande';
const HomeStack = createStackNavigator(
  {
    homeCoachScreen: {
      screen: homeCoachScreen,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    CreateBook: {
      screen: CreateBook,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    CreateReminder: {
      screen: CreateReminder,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    Activitie: {
      screen: Activitie,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    MyInformations: {
      screen: MyInformations,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    AwaitingDemand: {
      screen: AwaitingDemand,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    Demande: {
      screen: Demande,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
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
