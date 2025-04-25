import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import SalesDetailsScreenView from './SalesDetailsScreenView';
import SalesDetailsScreenController from './SalesDetailsScreenController';

const SalesDetailsScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="SalesDetailsScreen"
      viewClass={SalesDetailsScreenView}
      controllerClass={SalesDetailsScreenController}
    />
  );
};

export default SalesDetailsScreen;
