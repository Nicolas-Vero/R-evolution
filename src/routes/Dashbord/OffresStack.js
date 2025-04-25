import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import des écrans
import OffersCoachScreen from '../../screens/OffersCoachScreen/OffersCoachScreen';
import UpdateOfferCoachScreen from '../../screens/UpdateOfferCoachScreen/UpdateOfferCoachScreen';
import OffersTrainingsCoachScreen from '../../screens/OffersTrainingsCoachScreen/OffersTrainingsCoachScreen';
import CreateOfferCoachScreen from '../../screens/CreateOfferCoachScreen/CreateOfferCoachScreen';

const Stack = createNativeStackNavigator();

const OffresStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OffersTrainingsCoach" component={OffersTrainingsCoachScreen} />
      <Stack.Screen
        name="OffersCoach"
        component={OffersCoachScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="list" size={20} color={color} />,
        }}
      />
      <Stack.Screen
        name="CreateOfferCoach"
        component={CreateOfferCoachScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="add" size={20} color={color} />,
        }}
      />
      <Stack.Screen
        name="UpdateOfferCoach"
        component={UpdateOfferCoachScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="create" size={20} color={color} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default OffresStack;
