import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

import HomeStack from './HomeStack';
import OffresStack from './OffresStack';
import MyAthletesStack from './MyAthletesStack';
import DashboardCoachStack from './DashboardStack';

const Tab = createBottomTabNavigator();

function GradientTabBarBackground() {
  return (
    <LinearGradient
      colors={['#1A1E21', '#101010']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: 65 }}
    />
  );
}

const AppTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: '#2CDEE4',
          borderTopWidth: 0.5,
          height: 65,
        },
        tabBarBackground: () => <GradientTabBarBackground />,
        tabBarActiveTintColor: '#2CDEE4',
        tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ color }) => {
          const icons = {
            HomeStack: require('../../../assets/images/Calendar.png'),
            OffresStack: require('../../../assets/images/Category.png'),
            MyAthletesStack: require('../../../assets/images/User.png'),
            DashboardCoachStack: require('../../../assets/images/Chart.png'),
          };
          return (
            <Image
              source={icons[route.name]}
              style={{ height: 24, width: 24, resizeMode: 'contain', tintColor: color }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="OffresStack" component={OffresStack} />
      <Tab.Screen name="MyAthletesStack" component={MyAthletesStack} />
      <Tab.Screen name="DashboardCoachStack" component={DashboardCoachStack} />
    </Tab.Navigator>
  );
};

export default AppTabsNavigator;
