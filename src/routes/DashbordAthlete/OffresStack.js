import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des écrans
import OfferPaiementModeScreen from '../../AtlheteScreens/offerPaiement/offerPaiementMode';
import MyWeb from '../../AtlheteScreens/WebView';
import OffersScreen from '../../AtlheteScreens/OffersScreen/OffersScreen';

const Stack = createNativeStackNavigator();

const OffresStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="OfferPaiementMode" component={OfferPaiementModeScreen} />
      <Stack.Screen name="WebPaiement" component={MyWeb} />
    </Stack.Navigator>
  );
};

export default OffresStack;
