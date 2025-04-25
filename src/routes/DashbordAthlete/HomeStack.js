import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des écrans
import HomeAthleteScreen from '../../AtlheteScreens/HomeAthleteScreen/HomeAthleteScreen';
import AccountScreen from '../../AtlheteScreens/AccountScreen/AccountScreen';
import ProfileAthleteScreen from '../../AtlheteScreens/ProfileAthleteScreen/ProfileAthleteScreen';
import NotificationsScreen from '../../AtlheteScreens/NotificationsScreen/NotificationsScreen';
import CoachSheetScreen from '../../AtlheteScreens/CoachSheetScreen/CoachSheetScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeAthlete" component={HomeAthleteScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="ProfileAthlete" component={ProfileAthleteScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="CoachSheet" component={CoachSheetScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
