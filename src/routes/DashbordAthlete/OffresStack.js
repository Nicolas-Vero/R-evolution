import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import offersScreen from '../../AtlheteScreens/offers/offersScreen';
import offerPaimentModeScreen from '../../AtlheteScreens/offerPaiement/offerPaiementMode';
import MyWeb from '../../AtlheteScreens/WebView';

const OffresStack = createStackNavigator(
  {
    offersScreen: {
      screen: offersScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },

    offerPaimentModeScreen: {
      screen: offerPaimentModeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },

    WebPaiement: {
      screen: MyWeb,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons size={20} color={tintColor} />,
        headerShown: false,
      },
    },
  },
  {
    lazy: true,
      // initialRouteName: ':',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
  },
);

export default OffresStack;
