import React from 'react';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import OffersCoachScreenController from './OffersCoachScreenController';
import OffersScreenView from './OffersCoachScreenControllerView';

const OffersCoachScreen = ({ route }) => {
  return (
    <AbstractScreen
      screenName="OffersCoachScreen"
      viewClass={OffersScreenView}
      controllerClass={OffersCoachScreenController}
      {...route.params} // Permet de passer les paramètres de navigation
    />
  );
};

export default OffersCoachScreen;
