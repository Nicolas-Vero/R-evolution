import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL, STORAGE } from '../configs/Constants';
import { getHeaders } from './Global';
import AuthService from '../services/AuthService';

export const athlete_login = (params) => {
  const data = params;
  console.log('[URL]', data, `${API_URL}/auth/athlete-login`);
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/athlete-login`,
    data: data,
  });
};

export const athlete_appointement = (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/athlete/appointments`,
    data: data,
  });
};

export const athlete_booking = async (params) => {
  const { coach_id, date, athlete_course_id, currentSlot } = params;
  console.log(params);
  const data = {
    date: date,
    athlete_course_id: athlete_course_id,
    slot: currentSlot,
  };
  const headers = await AuthService.getHeader();
  console.log('coachID', coach_id, '', currentSlot);
  return axios({
    method: 'POST',
    url: `${API_URL}/athlete/book-slot/${coach_id}`,
    headers: headers,
    data: data,
  });
};

export const get_availabilities = async (params) => {
  const paramsData = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/coach-availability?`,
    headers: headers,
    params: paramsData,
  });
};

export const cancel_booking_athlete = async (params) => {
  const { coach_id, date, athlete_course_id, currentSlot } = params;
  const data = {
    athlete_course_id:athlete_course_id,
    date: date,
    coach_id:coach_id,
    currentSlot: currentSlot,
  };
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/athlete/cancel-booking/`,
    headers: headers,
    data: data,
  });
};

export const get_athlete_active_appointement = async (params) => {
  const data = params;
  console.log(params);
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/active-appointments`,
    headers: headers,
    params: data,
  });
};

export const get_athlete_active_courses = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/active-courses`,
    headers: headers,
  });
};

export const get_athlete_upcoming_appointement = (params) => {
  const data = params;
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/appointments`,
    params: { upcoming: data.upcoming },
  });
};

export const get_athlete_appointement = async (params) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/appointments`,
    headers: headers,
  });
};
export const get_book_athlete = async (params) => {
  const headers = await AuthService.getHeader();
  const date = params;
  console.log(params);
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/appointments/day`,
    headers: headers,
    params: { date: date },
  });
};

export const sign_up = async (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/athlete/sign-up/`,
    data: data,
  });
};

export const get_coach_by_gym_place = async (params, navigation) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/exercise_place`,
    headers: headers,
    data: data,
  });
};

export const cancel_booking = async (params, navigation) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/cancel-booking/${params.id}`,
    headers: headers,
  });
};

export const get_athlete_by_id = async (params) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/${params}`,
    headers: headers,
  });
};

export const get_athlete = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/me`,
    headers: headers,
  });
};
export const get_personal_coach = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach`,
    headers: headers,
  });
};

export const verify_athlete = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/verify-athlete`,
    headers: headers,
    data: data,
  });
};

export const athlete_change_password = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/change-password-athlete`,
    headers: headers,
    data: data,
  });
};

export const athlete_accept_invitation = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/accept-invitation-athlete`,
    headers: headers,
    data: data,
  });
};

export const update_current_athlete = async (params) => {
  const headers = await AuthService.getHeader();
  let user = await AsyncStorage.getItem(STORAGE.USER);
  user = JSON.parse(user);

  const data = new FormData();
  const attributes = Object.keys(params);
  attributes.forEach((attr) => data.append(`athlete[${attr}]`, params[attr]));
  return axios({
    method: 'POST',
    url: `${API_URL}/athlete/me/`,
    data: data,
    headers: headers,
  });
};

export const update_athlete_password = async (params) => {
  let user = await AsyncStorage.getItem(STORAGE.USER);
  user = JSON.parse(user);

  const data = new FormData();
  const attributes = Object.keys(params);
  attributes.forEach((attr) => data.append(`pro[${attr}]`, params[attr]));
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/change-password-athlete`,
    data: data,
    headers: headers,
  });
};

export const athlete_forgot_password = async (params) => {
  const headers = await AuthService.getHeader();
  let user = await AsyncStorage.getItem(STORAGE.USER);
  user = JSON.parse(user);

  const data = new FormData();
  const attributes = Object.keys(params);
  attributes.forEach((attr) => data.append(`pro[${attr}]`, params[attr]));
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/forgot-password-athlete`,
    data: data,
    headers: headers,
  });
};

export const reset_password_mail_link = async (params, navigation) => {
  const headers = await AuthService.getHeader();
  let user = await AsyncStorage.getItem(STORAGE.USER);
  user = JSON.parse(user);

  const data = new FormData();
  const attributes = Object.keys(params);
  attributes.forEach((attr) => data.append(`pro[${attr}]`, params[attr]));
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/reset-password-athlete`,
    data: data,
    headers: headers,
  });
};
