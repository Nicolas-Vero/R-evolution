import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { isIphoneX } from 'react-native-iphone-x-helper';

import OffresStack from './OffresStack';
import HomeStack from './HomeStack';
import MyAthletesStack from './MyAthletesStack';
import DashboardCoachStack from './DashboardStack';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBar } from 'react-navigation-tabs';
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
    // DashboardCoachStack: {
    //   screen: DashboardCoachStack,
    //   navigationOptions: ({ navigation }) => ({
    //     tabBarLabel: 'Dashboard',
    //     tabBarVisible: getTabBarVisiblility(navigation),
    //     tabBarIcon: ({ tintColor }) => (
    //       <Image
    //         source={require('../../../assets/images/Chart.png')}
    //         style={{ height: 20, width: 20, resizeMode: 'contain', tintColor }}
    //       />
    //     ),
    //   }),
    // },
  },
  {
    tabBarComponent: (props) => {
      return (
        <LinearGradient
          colors={['#1A1E21', '#101010']}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          style={{ height: isIphoneX() ? 65 : 50 }}>
          <BottomTabBar
            {...props}
            style={{
              backgroundColor: 'transparent',
              borderTopColor: '#2CDEE4',
              borderTopWidth: 0.5,
            }}
          />
        </LinearGradient>
      );
    },
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
    'DashboardScreen',
  ].includes(route.routeName);
};

export default AppTabsNavigator;
