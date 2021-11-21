import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import OffersCoachScreen from '../../screens/OffersCoachScreen/OffersCoachScreen';
import UpdateOfferCoachScreen from '../../screens/UpdateOfferCoachScreen/UpdateOfferCoachScreen';
import OffersTrainingsCoachScreen from '../../screens/OffersTrainingsCoachScreen/OffersTrainingsCoachScreen';
import CreateOfferCoachScreen from '../../screens/CreateOfferCoachScreen/CreateOfferCoachScreen';
const OffresStack = createStackNavigator(
  {
    OffersTrainingsCoachScreen: {
      screen: OffersTrainingsCoachScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    OffersCoachScreen: {
      screen: OffersCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
    CreateOfferCoachScreen: {
      screen: CreateOfferCoachScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },

    UpdateOfferCoachScreen: {
      screen: UpdateOfferCoachScreen,
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
