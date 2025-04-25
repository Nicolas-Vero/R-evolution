import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import OffersTrainingsCoachScreenController from './OffersTrainingsCoachScreenController';
import OffersTrainingsCoachScreenView from './OffersTrainingsCoachScreenView';

const OffersTrainingsCoachScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="OffersTrainingsCoachScreen"
      viewClass={OffersTrainingsCoachScreenView}
      controllerClass={OffersTrainingsCoachScreenController}
    />
  );
};

export default connect()(OffersTrainingsCoachScreen);
