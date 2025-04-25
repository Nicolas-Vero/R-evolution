import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import TreshRequestCoachScreenView from './TreshRequestCoachScreenView';
import TreshRequestCoachScreenController from './TreshRequestCoachScreenController';

const TreshRequestCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="TreshRequestCoachScreen"
      viewClass={TreshRequestCoachScreenView}
      controllerClass={TreshRequestCoachScreenController}
    />
  );
};

export default TreshRequestCoachScreen;
