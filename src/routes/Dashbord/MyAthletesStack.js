import { createStackNavigator } from 'react-navigation-stack';
import Activite from '../../screens/Activite';
import MyAthleteDetails from '../../screens/MyAthleteDetails';
import MyAthleteDetailsInactifs from '../../screens/MyAthleteDetailsInactifs';
import MyAthleteDetailsProspects from '../../screens/MyAthleteDetailsProspects';
import MyAthletes from '../../screens/MyAthletes';
import Paiements from '../../screens/Paiements';

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
    MyAthleteDetailsProspects: {
      screen: MyAthleteDetailsProspects,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        header: null,
      },
    },
    MyAthleteDetailsInactifs: {
      screen: MyAthleteDetailsInactifs,
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
    AddPaiement: {
      screen: Paiements,
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

export default MyAthletesStack;
