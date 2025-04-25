import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import des écrans
import PendingRequestCoachScreen from '../../screens/PendingRequestCoachScreen/PendingRequestCoachScreen';
import HomeCoachScreen from '../../screens/HomeCoachScreen/HomeCoachScreen';
import AccountScreen from '../../screens/AccountScreen/AccountScreen';
import TreshRequestCoachScreen from '../../screens/TreshRequestCoachScreen/TreshRequestCoachScreen';
import ProfileCoachScreen from '../../screens/ProfileCoachScreen/ProfileCoachScreen';
import ActivitiesCoachScreen from '../../screens/ActivitiesCoachScreen/ActivitiesCoachScreen';
import CreateReminderCoachScreen from '../../screens/CreateReminderCoachScreen/CreateReminderCoachScreen';
import CreateBookCoachScreen from '../../screens/CreateBookCoachScreen/CreateBookCoachScreen';
import AthleteSheetCoachScreen from '../../screens/AthleteSheetCoachScreen/AthleteSheetCoachScreen';
import UpdateBookCoachScreen from '../../screens/UpdateBookCoachScreen/UpdateBookCoachScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeCoachScreen" component={HomeCoachScreen} />
      <Stack.Screen name="CreateBookCoachScreen" component={CreateBookCoachScreen} />
      <Stack.Screen name="CreateReminderCoachScreen" component={CreateReminderCoachScreen} />
      <Stack.Screen name="ActivitiesCoachScreen" component={ActivitiesCoachScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ProfileCoachScreen" component={ProfileCoachScreen} />
      <Stack.Screen name="PendingRequestCoachScreen" component={PendingRequestCoachScreen} />
      <Stack.Screen name="TreshRequestCoachScreen" component={TreshRequestCoachScreen} />
      <Stack.Screen name="AthleteSheetCoachScreen" component={AthleteSheetCoachScreen} />
      <Stack.Screen name="UpdateBookCoachScreen" component={UpdateBookCoachScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
