import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import HomeCoachScreenController from './HomeCoachScreenController';
import HomeCoachScreenView from './HomeCoachScreenView';

const HomeCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="HomeCoachScreen"
      viewClass={HomeCoachScreenView}
      controllerClass={HomeCoachScreenController}
    />
  );
};

export default HomeCoachScreen;
