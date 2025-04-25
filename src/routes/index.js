import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardStack from './DashboardStack';
import DashboardStackAthlete from './DashboardStackAthlete';
import AppLauncher from './AppLauncher/AppLauncher';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppLauncher" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppLauncher" component={AppLauncher} />
        <Stack.Screen name="Entry" component={AuthStack} />
        <Stack.Screen name="DashboardStack" component={DashboardStack} />
        <Stack.Screen name="DashboardStackAthlete" component={DashboardStackAthlete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
