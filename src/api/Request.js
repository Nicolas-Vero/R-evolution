import axios from 'axios';
import { API_URL } from '../configs/Constants';
import AuthService from '../services/AuthService';

export const get_public_request = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/requests`,
    headers: headers,
  });
};
export const get_assigned_request_by_month = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/requests/assigned_by_month`,
    headers: headers,
  });
};

export const assign_request = async (params) => {
  const headers = await AuthService.getHeader();
  const id = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/request/assign`,
    data: { request_id: id },
    headers: headers,
  });
};

export const get_personnal_request = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/request/me`,
    headers: headers,
  });
};

export const get_request_by_athlete_id = async (athleteId) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/requests/${athleteId}`,
    headers: headers,
  });
};
