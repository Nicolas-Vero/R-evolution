import { createStackNavigator } from 'react-navigation-stack';
import myCoachScreen from '../../AtlheteScreens/myCoach/myCoachScreen';

const AthletesStack = createStackNavigator(
  {
    myCoachScreen: {
      screen: myCoachScreen,
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

export default AthletesStack;
