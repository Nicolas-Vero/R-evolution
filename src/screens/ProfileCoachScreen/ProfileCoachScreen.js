import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import ProfileCoachScreenView from './ProfileCoachScreenView';
import ProfileCoachScreenController from './ProfileCoachScreenController';

const ProfileCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="ProfileCoachScreen"
      viewClass={ProfileCoachScreenView}
      controllerClass={ProfileCoachScreenController}
    />
  );
};

export default ProfileCoachScreen;
