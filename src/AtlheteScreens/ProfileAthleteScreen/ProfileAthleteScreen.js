import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import ProfileAthleteScreenController from './ProfileAthleteScreenController';
import ProfileAthleteScreenView from './ProfileAthleteScreenView';

const ProfileAthleteScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="ProfileAthleteScreen"
      viewClass={ProfileAthleteScreenView}
      controllerClass={ProfileAthleteScreenController}
    />
  );
};

export default ProfileAthleteScreen;
