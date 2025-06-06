import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LoggerService from '../../../services/LoggerService';

const useController = (ControllerClass, initialState = {}) => {
  const [state, setState] = useState(initialState);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!ControllerClass) {
      LoggerService.error('ControllerClass is required');
      return;
    }

    controllerRef.current = new ControllerClass({ state, setState });
    controllerRef.current.init?.();

    return () => {
      controllerRef.current?.cleanup?.();
    };
  }, []);

  return [state, controllerRef.current];
};

const AbstractScreen = ({ screenName, ControllerClass, ViewComponent, initialState = {} }) => {
  const navigation = useNavigation();
  const [state, controller] = useController(ControllerClass, initialState);

  useFocusEffect(
    React.useCallback(() => {
      controller?.onFocus?.();
      return () => controller?.onBlur?.();
    }, [controller])
  );

  if (!ControllerClass || !ViewComponent) {
    LoggerService.error('Missing ViewComponent or ControllerClass');
    return null;
  }

  return <ViewComponent screenName={screenName} state={state} controller={controller} navigation={navigation} />;
};

export default AbstractScreen;
