import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des écrans
import CoachSheetScreen from '../../AtlheteScreens/CoachSheetScreen/CoachSheetScreen';

const Stack = createNativeStackNavigator();

const AthletesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CoachSheet" component={CoachSheetScreen} />
    </Stack.Navigator>
  );
};

export default AthletesStack;
