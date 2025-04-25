import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CreateReminderCoachScreenView from './CreateReminderCoachScreenView';
import CreateReminderCoachScreenController from './CreateReminderCoachScreenController';

const CreateReminderCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="CreateReminderCoachScreen"
      viewClass={CreateReminderCoachScreenView}
      controllerClass={CreateReminderCoachScreenController}
    />
  );
};

export default CreateReminderCoachScreen;
