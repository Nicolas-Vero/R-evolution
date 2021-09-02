import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
import CreateBook from '../../screens/CreateBook';
import MyAthletes from '../../screens/MyAthletes';

const AthletesStack = createStackNavigator(
  {
    MyAthletes: {
      screen: MyAthletes,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        header: null,
      },
    },
    MyAthletesDetails: {
      screen: CreateBook,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        header: null,
      },
    },
    AthletesProfils: {
      screen: Activite,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
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

export default AthletesStack;
