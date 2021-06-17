import * as types from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (e) {
    // TODO
  }
};

const initialState = {
  authenticated: true,
  entryLoading: true,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        authenticated: true,
        entryLoading: false,
      };

    case types.UNAUTH_USER:
      clearToken();
      return {
        ...state,
        authenticated: false,
      };

    default:
      return state;
  }

  return state;
};

export default session;
