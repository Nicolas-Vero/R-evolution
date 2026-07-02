import { createStackNavigator } from 'react-navigation-stack';
import DashboardScreen from '../../screens/DashboardScreen/DashboardScreen';
import SalesDetailsScreen from '../../screens/SalesDetailsScreen/SalesDetailsScreen';

const DashboardCoachStack = createStackNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    SalesDetailsScreen: {
      screen: SalesDetailsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
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

export default DashboardCoachStack;
