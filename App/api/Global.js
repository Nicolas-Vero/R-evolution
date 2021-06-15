import {AsyncStorage} from 'react-native';
import {STORAGE} from '../configs/Constants';

export const getHeaders = async () => {
  let headers = await AsyncStorage.getItem(STORAGE.HEADERS);
  if (!headers) return null;
  headers = JSON.parse(headers);
  return headers;
};

export const buildQueryParams = (params = {}) => {
  let queryParams = "?";
  const keys = Object.keys(params);
  keys.forEach(key => queryParams += `${key}=${params[key]}&`);
  return queryParams;
};
