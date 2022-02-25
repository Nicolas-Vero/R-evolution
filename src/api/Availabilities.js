import axios from 'axios';
import { API_URL } from '../configs/Constants';
import AuthService from '../services/AuthService';

export const get_availabilities = async (date) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/availability?date=${date}`,
    headers: headers,
  });
};
export const get_book = async (param) => {
  const date = param;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/appointment`,
    headers: headers,
    params: { date: date },
  });
};
export const update_availabilities = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/availability`,
    headers: headers,
    data: data,
  });
};

export const updateorcreate_availability = (params) => {
  return axios({
    method: 'POST',
    url: `http://localhost:3000/availability/add`,
    data: params,
  });
};
