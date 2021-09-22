import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite'; //athlet activite screen
import AwaitingDemand from '../../screens/AwaitingDemand';
import CreateBook from '../../screens/CreateBook';
import Dashboard from '../../screens/Dashboard';
import CreateRappel from '../../screens/CreateRappel';
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
    CreateRappel: {
      screen: CreateRappel,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    Activite: {
      screen: Activite,
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
