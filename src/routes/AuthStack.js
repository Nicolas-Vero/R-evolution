import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryScreen from '../screens/Auth/entry/EntryScreen';
import LoginScreen from '../screens/Auth/login/LoginScreen';
import RegisterScreen from '../screens/register/common/register/RegisterScreen';
import forgetPasswordScreen from '../screens/Auth/forgetPassword/forgetPasswordScreen';
import AvatarScreen from '../screens/register/common/avatar/AvatarScreen';
import MensurationScreen from '../screens/register/athlete/mensuration/MensurationScreen';
import ExperienceScreen from '../screens/register/athlete/experience/ExperienceScreen';
import GoalScreen from '../screens/register/athlete/goal/GoalScreen';
import HealthScreen from '../screens/register/athlete/health/HealthScreen';
import SelectGymScreen from '../screens/register/athlete/selectGym/SelectGymScreen';
import TrainingDayScreen from '../screens/register/athlete/trainingDay/TrainingDayScreen';
import SelectCoachScreen from '../screens/register/athlete/selectCoach/SelectCoachScreen';
import DiplomasScreen from '../screens/register/coach/diplomas/DiplomasScreen';
import ExperienceCoachScreen from '../screens/register/coach/experience/ExperienceCoachScreen';
import SelectGymCoachScreen from '../screens/register/coach/selectGym/SelectGymCoachScreen';
import SpecialitiesScreen from '../screens/register/coach/specialities/SpecialitiesScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="AuthEntry"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      animation: 'fade',
    }}>
    <Stack.Screen name="AuthEntry" component={EntryScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="forgetPasswordScreen" component={forgetPasswordScreen} />
    <Stack.Screen name="MensurationScreen" component={MensurationScreen} />
    <Stack.Screen name="ExperienceScreen" component={ExperienceScreen} />
    <Stack.Screen name="GoalScreen" component={GoalScreen} />
    <Stack.Screen name="HealthScreen" component={HealthScreen} />
    <Stack.Screen name="SelectGymScreen" component={SelectGymScreen} />
    <Stack.Screen name="TrainingDayScreen" component={TrainingDayScreen} />
    <Stack.Screen name="SelectCoachScreen" component={SelectCoachScreen} />
    <Stack.Screen name="AvatarScreen" component={AvatarScreen} />
    <Stack.Screen name="DiplomasScreen" component={DiplomasScreen} />
    <Stack.Screen name="ExperienceCoachScreen" component={ExperienceCoachScreen} />
    <Stack.Screen name="SpecialitiesScreen" component={SpecialitiesScreen} />
    <Stack.Screen name="SelectGymCoachScreen" component={SelectGymCoachScreen} />
  </Stack.Navigator>
);

export default AuthStack;
