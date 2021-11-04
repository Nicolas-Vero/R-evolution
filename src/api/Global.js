import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from '../configs/Constants';

export const getHeaders = async () => {
  let headers = await AsyncStorage.getItem(STORAGE.HEADERS);
  if (!headers) return null;
  headers = JSON.parse(headers);
  return headers;
};

