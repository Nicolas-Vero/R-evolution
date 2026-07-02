import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL, STORAGE } from '../configs/Constants';
import AuthService from '../services/AuthService';
import moment from 'moment';
import { request } from '../services/axiosService';
export const coach_reminder = async (params) => {
  const data = {
    ...params,
    date: moment(params.date, 'DD/MM/YYYY').format('YYYY/MM/DD'),
  };

  return await request('PUT', true, '/coach-reminder', null, data);
};

export const get_coach_reminder = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach-reminder`,
    headers: headers,
  });
};

export const get_coach_notifications = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/notifications/coach`,
    headers: headers,
  });
};

export const delete_coach_notification = async (notificationId) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'DELETE',
    url: `${API_URL}/notifications/coach/${notificationId}`,
    headers: headers,
  });
};

export const reminder_status_update = (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/coach-reminder`,
    data: data,
  });
};

export const reminder_update = (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/coach-reminder/status`,
    data: data,
  });
};

export const delete_reminder = async (params) => {
  const { reminder_id } = params;
  const data = { reminder_id: reminder_id };
  const headers = await AuthService.getHeader();
  return axios({
    method: 'DELETE',
    url: `${API_URL}/coach-reminder`,
    headers: headers,
    data: data,
  });
};
