import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ActivitiesCoachScreen from '../../screens/ActivitiesCoachScreen/ActivitiesCoachScreen';
import CreateSaleScreen from '../../screens/CreateSaleScreen/CreateSaleScreen';
import AthletesCoachScreen from '../../screens/AthletesCoachScreen/AthletesCoachScreen';
import AthleteSheetCoachScreen from '../../screens/AthleteSheetCoachScreen/AthleteSheetCoachScreen';

const Stack = createNativeStackNavigator();

const MyAthletesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AthletesCoach"
        component={AthletesCoachScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="people" size={20} color={color} />,
        }}
      />
      <Stack.Screen
        name="AthleteSheetCoach"
        component={AthleteSheetCoachScreen}
      />
      <Stack.Screen
        name="AthletesProfils"
        component={ActivitiesCoachScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="barbell" size={20} color={color} />,
        }}
      />
      <Stack.Screen
        name="CreateSaleScreen"
        component={CreateSaleScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="cash" size={20} color={color} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MyAthletesStack;
