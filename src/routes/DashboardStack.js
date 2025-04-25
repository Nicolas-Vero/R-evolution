import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabsNavigator from './Dashbord/AppTabsNavigator';
import HomeStack from './Dashbord/HomeStack';
import OffresStack from './Dashbord/OffresStack';
import MyAthletesStack from './Dashbord/MyAthletesStack';
import DashboardCoachStack from './Dashbord/DashboardStack';

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator initialRouteName="AppTabsNavigator" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppTabsNavigator" component={AppTabsNavigator} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="OffresStack" component={OffresStack} />
      <Stack.Screen name="MyAthletesStack" component={MyAthletesStack} />
      <Stack.Screen name="DashboardCoachStack" component={DashboardCoachStack} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
