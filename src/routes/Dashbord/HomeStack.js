import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
import AwaitingDemand from '../../screens/AwaitingDemand';
import CreateBook from '../../screens/CreateBook';
import Dashboard from '../../screens/Dashboard';

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
    Activite: {
      screen: Activite,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        headerVisible: false,
        animationEnabled: true,
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
