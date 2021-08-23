import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import OffreCreation from '../../screens/OffreCreation';
import OffreUpdate from '../../screens/OffreUpdate';
// Auth import
import OffresFormations from '../../screens/OffresFormations';
import Offres from '../../screens/Offres';


const OffresStack = createStackNavigator(
    {
      OffresFormations: {
        screen: OffresFormations,
        navigationOptions: {
          header: null,
        },
      },
      Offres: {
        screen: Offres,
        navigationOptions: {
         
          tabBarIcon: ({tintColor}) => (
            <Ionicons  size={20} color={tintColor} />
          ),
          header: null,
        },},
      OffreCreation: {
        screen: OffreCreation,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Ionicons  size={20} color={tintColor} />
          ),
          header: null,
        },
      },

      OffreUpdate: {
        screen: OffreUpdate,
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