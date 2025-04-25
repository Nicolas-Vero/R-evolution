import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../../screens/DashboardScreen/DashboardScreen';
import SalesDetailsScreen from '../../screens/SalesDetailsScreen/SalesDetailsScreen';

const Stack = createNativeStackNavigator();

const DashboardCoachStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="stats-chart" size={20} color={color} />,
        }}
      />
      <Stack.Screen
        name="SalesDetails"
        component={SalesDetailsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="receipt" size={20} color={color} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardCoachStack;
