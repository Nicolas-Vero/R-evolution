import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import BaseScreenView from './BaseScreenView';
import BaseScreenController from './BaseScreenController';

const BaseScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="BaseScreen"
      viewClass={BaseScreenView}
      controllerClass={BaseScreenController}
    />
  );
};

export default connect()(BaseScreen);
