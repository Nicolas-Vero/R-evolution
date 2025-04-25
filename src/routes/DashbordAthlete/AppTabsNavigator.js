import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';

// Import des stacks
import OffresStack from './OffresStack';
import HomeStack from './HomeStack';
import CoachSheetScreen from '../../AtlheteScreens/CoachSheetScreen/CoachSheetScreen';

const Tab = createBottomTabNavigator();

const AppTabsNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBarStyle,
          tabBarBackground: () => (
            <LinearGradient
              colors={['#1A1E21', '#101010']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          ),
          tabBarIcon: ({ color }) => {
            let iconName;
            let iconSource;

            if (route.name === 'HomeStack') {
              iconSource = require('../../../assets/images/Calendar.png');
            } else if (route.name === 'OffresStack') {
              iconSource = require('../../../assets/images/Category.png');
            } else if (route.name === 'AthletesStack') {
              iconSource = require('../../../assets/images/User.png');
            }

            return (
              <Image source={iconSource} style={[styles.icon, { tintColor: color }]} />
            );
          },
          tabBarActiveTintColor: '#2CDEE4',
          tabBarInactiveTintColor: 'white',
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="OffresStack" component={OffresStack} options={{ tabBarLabel: 'Offres' }} />
        <Tab.Screen name="AthletesStack" component={CoachSheetScreen} options={{ tabBarLabel: 'Fiche coach' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#1E2026',
    borderTopColor: '#2CDEE4',
    borderTopWidth: 0.5,
    height: 65,
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
});

export default AppTabsNavigator;
