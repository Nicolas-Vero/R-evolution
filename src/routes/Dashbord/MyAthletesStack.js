import { createStackNavigator } from 'react-navigation-stack';
import activitiesScreen from '../../screens/activitiesCoach/activitiesScreen';
import athleteSheetCoachScreen from '../../screens/athleteSheetCoach/athleteSheetCoachScreen';
import createPaymentScreen from '../../screens/createPayment/createPaymentScreen';
import athletesCoachScreen from '../../screens/athletesCoach/athletesCoachScreen';
const MyAthletesStack = createStackNavigator(
  {
    athletesCoachScreen: {
      screen: athletesCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    athleteSheetCoachScreen: {
      screen: athleteSheetCoachScreen,
      navigationOptions: {
        tabBarVisible: false,
        headerShown: false,
      },
    },
    AthletesProfils: {
      screen: activitiesScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    createPaymentScreen: {
      screen: createPaymentScreen,
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

export default MyAthletesStack;
