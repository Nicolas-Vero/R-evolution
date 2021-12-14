import { createStackNavigator } from 'react-navigation-stack';
import ActivitiesCoachScreen from '../../screens/ActivitiesCoachScreen/ActivitiesCoachScreen';
import CreateSaleScreen from '../../screens/CreateSaleScreen/CreateSaleScreen';
import AthletesCoachScreen from '../../screens/AthletesCoachScreen/AthletesCoachScreen';
import AthleteSheetCoachScreen from '../../screens/AthleteSheetCoachScreen/AthleteSheetCoachScreen';
const MyAthletesStack = createStackNavigator(
  {
    AthletesCoachScreen: {
      screen: AthletesCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    AthleteSheetCoachScreen: {
      screen: AthleteSheetCoachScreen,
      navigationOptions: {
        tabBarVisible: false,
        headerShown: false,
      },
    },
    AthletesProfils: {
      screen: ActivitiesCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    CreateSaleScreen: {
      screen: CreateSaleScreen,
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
