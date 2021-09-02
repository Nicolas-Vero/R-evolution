import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
import MyAthleteDetails from '../../screens/MyAthleteDetails';
import MyAthletes from '../../screens/MyAthletes';

const MyAthletesStack = createStackNavigator(
  {
    MyAthletes: {
      screen: MyAthletes,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        header: null,
      },
    },
    MyAthleteDetails: {
      screen: MyAthleteDetails,
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
    // AwaitingDemand: {
    //   screen: AwaitingDemand,
    //   navigationOptions: {
    //     tabBarIcon: ({tintColor}) => (
    //       <Ionicons  size={20} color={tintColor} />
    //     ),
    //     header: null,
    //   },
    // },
  },
  {
    lazy: true,
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
  },
);

export default MyAthletesStack;
