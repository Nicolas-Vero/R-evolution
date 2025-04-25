import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import NotificationsScreenController from './NotificationsScreenController';
import NotificationsScreenView from './NotificationsScreenView';

const NotificationsScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="NotificationsScreen"
      viewClass={NotificationsScreenView}
      controllerClass={NotificationsScreenController}
    />
  );
};

export default compose(connect())(NotificationsScreen);
