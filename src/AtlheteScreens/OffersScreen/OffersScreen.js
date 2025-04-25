import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import OffersScreenView from './OffersScreenView';
import OffersScreenController from './OffersScreenController';

const OffersScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="OffersScreen"
      viewClass={OffersScreenView}
      controllerClass={OffersScreenController}
    />
  );
};

export default OffersScreen;
