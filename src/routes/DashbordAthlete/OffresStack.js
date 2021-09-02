import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
// Auth import
import Offres from '../../AtlheteScreens/Offres';
import OffrePaiementMode from '../../AtlheteScreens/OffrePaiementMode';
import MyWeb  from '../../AtlheteScreens/WebView';



const OffresStack = createStackNavigator(
    {
      
      Offres: {
        screen: Offres,
        navigationOptions: {
         
          tabBarIcon: ({tintColor}) => (
            <Ionicons  size={20} color={tintColor} />
          ),
          header: null,
        },},
        
        OffrePaiementMode: {
          screen: OffrePaiementMode,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Ionicons  size={20} color={tintColor} />
            ),
            header: null,
          },
        },
   
        WebPaiement: {
          screen: MyWeb,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Ionicons  size={20} color={tintColor} />
            ),
            header: null,
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