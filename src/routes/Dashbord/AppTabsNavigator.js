import React from 'react';
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs';
//import Stats from '../../screens/Stats';
import OffresStack from './OffresStack';
import HomeStack from './HomeStack';
import MyAthletesStack from './MyAthletesStack';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPercentageToDP } from 'react-native-responsive-screen';
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
      MyAthletesStack: {
        screen: MyAthletesStack,
        navigationOptions: {
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({tintColor}) => (
            <Image source={require('../../../assets/images/User.png')}
            style={{height: 24, resizeMode: 'contain', tintColor}}
     />
          ),
        },
      },
      // stat: {
      //   screen: Stats,
      //   navigationOptions: {
  
      //     tabBarIcon: ({tintColor}) => (
      //       <Image source={require('../../../assets/images/Chart.png')}
      //             style={{height: 24, resizeMode: 'contain', tintColor}}
      //      />
      //     ),
      //   },
      // },
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
        inactiveTintColor: 'white',
        showIcon: true,
        showLabel: false,
        allowFontScaling: false,
        style:{borderTopColor:'#2CDEE4', backgroundColor:'#1E2026',height:heightPercentageToDP(4.5)}
      },
    },
  );
  export default AppTabsNavigator;