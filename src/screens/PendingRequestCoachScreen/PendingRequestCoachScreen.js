import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import PendingRequestCoachScreenView from './PendingRequestCoachScreenView';
import PendingRequestCoachScreenController from './PendingRequestCoachScreenController';

const PendingRequestCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="PendingRequestCoachScreen"
      viewClass={PendingRequestCoachScreenView}
      controllerClass={PendingRequestCoachScreenController}
    />
  );
};

export default PendingRequestCoachScreen;
