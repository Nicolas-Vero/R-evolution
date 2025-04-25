import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import CreateOfferCoachScreenView from './CreateOfferCoachScreenView';
import CreateOfferCoachScreenController from './CreateOfferCoachScreenController';

const CreateOfferCoachScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <CreateOfferCoachScreenView
      controller={new CreateOfferCoachScreenController()} // Instanciation du contrôleur
      navigation={navigation}
      route={route} // Permet d'accéder aux paramètres passés à l'écran
    />
  );
};

export default CreateOfferCoachScreen;
