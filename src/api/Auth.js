import axios from 'axios';
import { API_URL } from '../configs/Constants';
import { request } from '../services/axiosService';

export const authentification = (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: data,
  });
};

export const userType = async (params) => {
  return await request('GET', false, `/auth/userType/${params}`);
};

export const isEmailExist = async (email) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/auth/userExist/${email}`,
  });
};
