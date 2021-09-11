import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
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
        header: null,
      },
    },
    CreateBook: {
      screen: CreateBook,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        header: null,
      },
    },
    CreateRappel: {
      screen: CreateRappel,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        header: null,
      },
    },
    Activite: {
      screen: Activite,
      navigationOptions: {
        header: null
      },
    },
    Account:{
      screen: Account,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },
    },
    MyInformations:{
      screen: MyInformations,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
      },
    },
    AwaitingDemand: {
      screen: AwaitingDemand,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Ionicons  size={20} color={tintColor} />
        ),
        header: null,
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
