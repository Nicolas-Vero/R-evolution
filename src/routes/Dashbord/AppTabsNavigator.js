import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//import Stats from '../../screens/Stats';
import OffresStack from './OffresStack';
import HomeStack from './HomeStack';
import MyAthletesStack from './MyAthletesStack';
// Auth import

const AppTabsNavigator = createBottomTabNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Home',
        tabBarVisible: getTabBarVisiblility(navigation),
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/images/Calendar.png')}
            style={{ height: 22, width: 22, resizeMode: 'contain', tintColor }}
          />
        ),
      }),
    },
    OffresStack: {
      screen: OffresStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Offres',
        tabBarVisible: getTabBarVisiblility(navigation),
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/images/Category.png')}
            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor }}
          />
        ),
      }),
    },
    MyAthletesStack: {
      screen: MyAthletesStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Athlètes',
        tabBarVisible: getTabBarVisiblility(navigation),
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/images/User.png')}
            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor }}
          />
        ),
      }),
    },
    // stat: {
    //   screen: Stats,
    //   navigationOptions: {

    //     tabBarIcon: ({tintColor}) => (
    //       <Image source={require('../../../assets/images/Chart.png')}
    //             style={{height: 24, resizeMode: 'contain', tintColor}}
    //      />
    //     ),
    //   },
    // },
  },
  {
    lazy: true,
    initialRouteName: 'HomeStack',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    navigationOptions: {
      tabBarVisible: true,
      animationEnabled: true,
      gestureEnabled: false,
    },

    tabBarOptions: {
      activeTintColor: '#2CDEE4',
      inactiveTintColor: 'white',
      showIcon: true,
      showLabel: false,
      allowFontScaling: false,
      style: {
        borderTopColor: '#2CDEE4',
        alignSelf: 'center',
        backgroundColor: '#1E2026',
      },
    },
  },
);

const getTabBarVisiblility = (navigation) => {
  const route = navigation.state.routes[navigation.state.routes.length - 1];
  return [
    'homeCoachScreen',
    'OffersTrainingsCoachScreen',
    'AthletesCoachScreen',
  ].includes(route.routeName);
};

export default AppTabsNavigator;
