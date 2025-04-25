import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import CoachSheetScreenView from './CoachSheetScreenView';
import CoachSheetScreenController from './CoachSheetScreenController';

const CoachSheetScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="CoachSheetScreen"
      viewClass={CoachSheetScreenView}
      controllerClass={CoachSheetScreenController}
    />
  );
};

export default connect()(CoachSheetScreen);
