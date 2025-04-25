import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import HomeAthleteController from './HomeAthleteController';
import HomeAthleteView from './HomeAthleteView';

const HomeAthleteScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="HomeAthleteScreen"
      viewClass={HomeAthleteView}
      controllerClass={HomeAthleteController}
    />
  );
};

export default HomeAthleteScreen;
