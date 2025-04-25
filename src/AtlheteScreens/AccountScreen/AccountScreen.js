import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AbstractScreen from '../../components/abstracts/AbstractScreen/AbstractScreen';
import AccountScreenView from './AccountScreenView';
import AccountScreenController from './AccountScreenController';

const AccountScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <AbstractScreen
      props={{ ...props, navigation, route }}
      screenName="AccountScreen"
      viewClass={AccountScreenView}
      controllerClass={AccountScreenController}
    />
  );
};

export default AccountScreen;
