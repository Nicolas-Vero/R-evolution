import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL, STORAGE } from '../configs/Constants';
import AuthService from '../services/AuthService';
import moment from 'moment';
export const coach_reminder = async (params) => {
  const { title, content, status, color, date, hour } = params;

  const formatDate = moment(date, 'YYYY-MM-DD');
  console.log({ title, content, status, color, date, hour });
  const headers = await AuthService.getHeader();
  return axios({
    method: 'PUT',
    url: `${API_URL}/coach-reminder`,
    data: {
      title: title,
      content: content,
      status: status,
      color: color,
      date: formatDate,
      hour: hour,
    },
    headers: headers,
  });
};

export const get_coach_reminder = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach-reminder`,
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
  const data = params;
  return axios({
    method: 'DELETE',
    url: `${API_URL}/coach-reminder`,
    data: data,
  });
};
