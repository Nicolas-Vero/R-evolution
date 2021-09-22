import { createStackNavigator } from 'react-navigation-stack';
import MyCoach from '../../AtlheteScreens/MyCoach';

const AthletesStack = createStackNavigator(
  {
    MyCoach: {
      screen: MyCoach,
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
