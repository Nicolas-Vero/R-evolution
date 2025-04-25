import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import ActivitiesCoachScreenController from './ActivitiesCoachScreenController';
import ActivitiesCoachScreenView from './ActivitiesCoachScreenView';

const ActivitiesCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="ActivitiesCoachScreen"
      viewClass={ActivitiesCoachScreenView}
      controllerClass={ActivitiesCoachScreenController}
    />
  );
};

export default ActivitiesCoachScreen;
