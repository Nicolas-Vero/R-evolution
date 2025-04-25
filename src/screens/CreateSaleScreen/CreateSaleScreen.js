import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateSaleScreenController from './CreateSaleScreenController';
import CreateSaleScreenView from './CreateSaleScreenView';

const CreateSaleScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="CreateSaleScreen"
      viewClass={CreateSaleScreenView}
      controllerClass={CreateSaleScreenController}
    />
  );
};

export default CreateSaleScreen;
