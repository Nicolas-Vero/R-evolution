import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import DashboardScreenView from './DashboardScreenView';
import DashboardScreenController from './DashboardScreenController';

const DashboardScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="DashboardScreen"
      viewClass={DashboardScreenView}
      controllerClass={DashboardScreenController}
    />
  );
};

export default DashboardScreen;
