import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL, STORAGE } from '../configs/Constants';
import { getHeaders } from './Global';
import AuthService from '../services/AuthService';


export const authentification =  (params) => {
    const data = params;
    return axios({
      method: 'POST',
      url: `${API_URL}/auth/login`,
      data: data,
    });
  };

export const userType = (params) => {
    const data = params;
    console.log(data);
    return axios({
      method: 'GET',
      url: `${API_URL}/auth/userType/${params}`,
    });
  };