import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import offersTrainingsCoachScreen from '../../screens/offersTrainingsCoach/offersTrainingsCoachScreen';
import offersCoachScreen from '../../screens/offersCoach/offersCoachScreen';
import addOfferCoachScreen from '../../screens/addOfferCoach/addOfferCoachScreen';
import updateOfferCoachScreen from '../../screens/updateOfferCoach/updateOfferCoachScreen';
const OffresStack = createStackNavigator(
  {
    offersTrainingsCoachScreen: {
      screen: offersTrainingsCoachScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    offersCoachScreen: {
      screen: offersCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    addOfferCoachScreen: {
      screen: addOfferCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },

    updateOfferCoachScreen: {
      screen: updateOfferCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
  },
  {
    lazy: true,
    //   initialRouteName: 'OffresFormations',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
  },
);

export default OffresStack;
