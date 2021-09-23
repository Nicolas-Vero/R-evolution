import { createStackNavigator } from 'react-navigation-stack';
import Activitie from '../../screens/Activitie'; //athlet activite screen
import AwaitingDemand from '../../screens/AwaitingDemand';
import CreateBook from '../../screens/CreateBook';
import Dashboard from '../../screens/Dashboard';
import CreateReminder from '../../screens/CreateReminder';
import Account from '../../screens/Account';
import MyInformations from '../../screens/MyInformations';
const HomeStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        headerShown: false,
      },
    },
    CreateBook: {
      screen: CreateBook,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    CreateReminder: {
      screen: CreateReminder,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    Activitie: {
      screen: Activitie,
      navigationOptions: {
        headerShown: false
      },
    },
    Account:{
      screen: Account,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
      },
    },
    MyInformations:{
      screen: MyInformations,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
      },
    },
    AwaitingDemand: {
      screen: AwaitingDemand,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        headerShown: false,
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
