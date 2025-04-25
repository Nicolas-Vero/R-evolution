import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des stacks
import HomeStack from './DashbordAthlete/HomeStack';
import OffresStack from './DashbordAthlete/OffresStack';
import AthletesStack from './DashbordAthlete/AthletesStack';
import AppTabsNavigator from './DashbordAthlete/AppTabsNavigator';

const Stack = createNativeStackNavigator();

const DashboardStackAtlhete = () => {
  return (
    <Stack.Navigator initialRouteName="AppTabsNavigator" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppTabsNavigator" component={AppTabsNavigator} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="OffresStack" component={OffresStack} />
      <Stack.Screen name="AthletesStack" component={AthletesStack} />
    </Stack.Navigator>
  );
};

export default DashboardStackAtlhete;
