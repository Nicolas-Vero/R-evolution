import React from 'react';
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import OffresStack from './OffresStack';
import HomeStack from './HomeStack';
import AthletesStack from './AthletesStack';
import myCoachScreen from '../../AtlheteScreens/myCoach/myCoachScreen';
import { heightPercentageToDP } from 'react-native-responsive-screen';
// Auth import


const AppTabsNavigator = createBottomTabNavigator(
    {
      HomeStack: {
        screen: HomeStack,
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
           <Image source={require('../../../assets/images/Calendar.png')}
                  style={{height: 24, resizeMode: 'contain', tintColor}}
           />
          ),
        },
      },
      OffresStack: {
        screen: OffresStack,
        navigationOptions: {
          tabBarLabel: 'offres',
          tabBarIcon: ({tintColor}) => (
            <Image source={require('../../../assets/images/Category.png')}
            style={{height: 24, resizeMode: 'contain', tintColor}}
     />
          ),
        },
      },
      AthletesStack: {
        screen: myCoachScreen,
        navigationOptions: {
          tabBarLabel: 'myCoachScreen',
          tabBarIcon: ({tintColor}) => (
            <Image source={require('../../../assets/images/User.png')}
            style={{height: 24, resizeMode: 'contain', tintColor}}
     />
          ),
        },
      },
    },
    {
      lazy: true,
      initialRouteName:'HomeStack',
      swipeEnabled: true,
      animationEnabled: true,
      tabBarPosition: 'bottom',
      navigationOptions: {
        tabBarVisible: true,
        animationEnabled: true,
        gestureEnabled:false,
      },
  
      tabBarOptions: {
        activeTintColor: '#2CDEE4',
        inactiveTintColor: 'white',
        showIcon: true,
        showLabel: false,
        allowFontScaling: false,
        style:{borderTopColor:'#2CDEE4', alignSelf:'center', backgroundColor:'#1E2026'}
      },
    },
  );
  export default AppTabsNavigator;