import React from 'react'
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';

const DashboardTab = createBottomTabNavigator(
    {
      OffresFormations: {
        screen: OffresFormations,
        navigationOptions: {
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({tintColor}) => (
            <Image source={require('../../assets/images/Category.png')}
            style={{height: 24, resizeMode: 'contain', tintColor}}
     />
          ),
        },
      },
      Dashboard: {
        screen: Dashboard,
        navigationOptions: {
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({tintColor}) => (
           <Image source={require('../../assets/images/Calendar.png')}
                  style={{height: 24, resizeMode: 'contain', tintColor}}
           />
          ),
        },
      },
      User: {
        screen: User,
        navigationOptions: {
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({tintColor}) => (
            <Image source={require('../../assets/images/User.png')}
            style={{height: 24, resizeMode: 'contain', tintColor}}
     />
          ),
        },
      },
    },
    {
      lazy: true,
      initialRouteName:'Dashboard',
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

export default DashboardTab;
