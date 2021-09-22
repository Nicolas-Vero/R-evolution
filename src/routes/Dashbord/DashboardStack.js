import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import OffreCreation from '../../screens/OffreCreation';
import OffreUpdate from '../../screens/OffreUpdate';
// Auth import
import OffresFormations from '../../screens/OffresFormations';
import Offres from '../../screens/Offres';


const DashbordBoardStack = createStackNavigator(
    {
      Dashbord: {
        screen: Dashdatas,
        navigationOptions: {
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

  export default DashbordBoardStack;