import React from 'react';
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import OffresStack from './OffresStack';
import HomeStack from './HomeStack';
import AthletesStack from './AthletesStack';
// Auth import


const AppTabsNavigator = createBottomTabNavigator(
    {
      HomeStack: {
        screen: HomeStack,
        navigationOptions: {
          tabBarLabel: 'Dashboard',
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
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({tintColor}) => (
            <Image source={require('../../../assets/images/Category.png')}
            style={{height: 24, resizeMode: 'contain', tintColor}}
     />
          ),
        },
      },
      AthletesStack: {
        screen: AthletesStack,
        navigationOptions: {
          tabBarLabel: 'Dashboard',
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
        tabBarVisible: false,
        animationEnabled: true,
      },
     // tabBarComponent: props => <CustomMainTabBar {...props} main={true} />,
      tabBarOptions: {
        activeTintColor: '#2CDEE4',
        inactiveTintColor: 'grey',
        showIcon: true,
        showLabel: false,
        allowFontScaling: false,
        style:{backgroundColor:'#2D333C'}
      },
    },
  );
  export default AppTabsNavigator;