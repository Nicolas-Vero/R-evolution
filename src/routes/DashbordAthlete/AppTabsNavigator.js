import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import OffresStack from './OffresStack';
import HomeStack from './HomeStack';
import CoachSheetScreen from '../../AtlheteScreens/CoachSheetScreen/CoachSheetScreen';
import { heightPercentageToDP } from 'react-native-responsive-screen';
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
            style={{ height: 26, resizeMode: 'contain', tintColor }}
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
            style={{ height: 26, resizeMode: 'contain', tintColor }}
          />
        ),
      }),
    },
    AthletesStack: {
      screen: CoachSheetScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'Fiche coach',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../../assets/images/User.png')}
            style={{ height: 26, resizeMode: 'contain', tintColor }}
          />
        ),
      }),
    },
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

  return ['HomeAthleteScreen', 'CoachSheetScreen', 'OffersScreen'].includes(
    route.routeName,
  );
};

export default AppTabsNavigator;
