import axios from 'axios';
import { API_URL } from '../configs/Constants';
import AuthService from '../services/AuthService';

export const get_commercial_by_place = (params) => {
  const gym_place_id = params;
  return axios({
    method: 'GET',
    url: `${API_URL}/commercials/by_gym_place/${gym_place_id}`,
  });
};

export const get_commercial_by_id = async (params) => {
  const commercial_id = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/commercial/${commercial_id}`,
    headers: headers,
  });
};
