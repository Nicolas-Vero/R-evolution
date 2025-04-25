import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateBookCoachScreenView from './CreateBookCoachScreenView';
import CreateBookCoachScreenController from './CreateBookCoachScreenController';

const CreateBookCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="CreateBookCoachScreen"
      viewClass={CreateBookCoachScreenView}
      controllerClass={CreateBookCoachScreenController}
    />
  );
};

export default CreateBookCoachScreen;
