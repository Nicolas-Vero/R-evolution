import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import UpdateOfferCoachScreenController from './UpdateOfferCoachScreenController';
import UpdateOfferCoachScreenView from './UpdateOfferCoachScreenView';

const UpdateOfferCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="UpdateOfferCoachScreen"
      viewClass={UpdateOfferCoachScreenView}
      controllerClass={UpdateOfferCoachScreenController}
    />
  );
};

export default UpdateOfferCoachScreen;
