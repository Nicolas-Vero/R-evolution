import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import UpdateBookCoachScreenView from './UpdateBookCoachScreenView';
import UpdateBookCoachScreenController from './UpdateBookCoachScreenController';

const UpdateBookCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="UpdateBookCoachScreen"
      viewClass={UpdateBookCoachScreenView}
      controllerClass={UpdateBookCoachScreenController}
    />
  );
};

export default UpdateBookCoachScreen;
