import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import AthleteSheetCoachScreenView from './AthleteSheetCoachScreenView';
import AthleteSheetCoachScreenController from './AthleteSheetCoachScreenController';

const AthleteSheetCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="AthleteSheetCoachScreen"
      viewClass={AthleteSheetCoachScreenView}
      controllerClass={AthleteSheetCoachScreenController}
    />
  );
};

export default AthleteSheetCoachScreen;
