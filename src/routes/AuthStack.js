import { createStackNavigator } from 'react-navigation-stack';
import RegisterInfo from '../screens/Auth/RegisterInfo';
import loginScreen from '../screens/Auth/login/loginScreen';
import SplashAuth from '../screens/SplashAuth';
import diplomas from '../components/diplomas';
import experience from '../components/experience';
import specialities from '../components/specialities';
import trainingPlace from '../components/trainingPlace';
import avatar from '../components/avatar';
import destinataire from '../components/componentsAthlete/destinataire';

const AuthStack = createStackNavigator(
  {
    loginScreen: {
      screen: loginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    SplashAuth: {
      screen: SplashAuth,
      navigationOptions: {
        headerShown: false,
      },
    },

    RegisterInfo: {
      screen: RegisterInfo,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
        swipeEnabled: false,
      },
    },
    diplomas: {
      screen: diplomas,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },

    experience: {
      screen: experience,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    specialities: {
      screen: specialities,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    trainingPlace: {
      screen: trainingPlace,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    avatar: {
      screen: avatar,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    destinataire: {
      screen: destinataire,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    // MoreInfo: {
    //   screen: MoreInfo,
    //   navigationOptions: {
    //     gestureEnabled:false,
    //     headerShown: false,
    //   },
    // },
  },
  {
    lazy: true,
    initialRouteName: 'RegisterInfo',
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: false,
      gestureEnabled: false,
      headerVisible: false,
      animationEnabled: true,
      swipeEnabled: false,
    },
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      showIcon: true,
      allowFontScaling: false,
    },
  },
);
export default AuthStack;
