import { createStackNavigator } from 'react-navigation-stack';
import CoachSheetScreen from '../../AtlheteScreens/CoachSheetScreen/CoachSheetScreen';

const AthletesStack = createStackNavigator(
  {
    CoachSheetScreen: {
      screen: CoachSheetScreen,
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
