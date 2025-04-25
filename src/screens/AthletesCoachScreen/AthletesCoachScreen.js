import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import AthletesCoachScreenController from './AthletesCoachScreenController';
import AthletesCoachScreenView from './AthletesCoachScreenView';

const AthletesCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="AthletesCoachScreen"
      viewClass={AthletesCoachScreenView}
      controllerClass={AthletesCoachScreenController}
    />
  );
};

export default AthletesCoachScreen;
