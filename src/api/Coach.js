import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL, STORAGE } from '../configs/Constants';
import AuthService from '../services/AuthService';
export const auth = (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/coach/sign-up`,
    data: data,
  });
};

export const coach_login = (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/coach-login`,
    data: data,
  });
};

export const invite_prospect = (params) => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/invite-athlete`,
    data: data,
  });
};

export const coach_booking = async (params) => {
  const { coach_id, date, coach_course_id, currentSlot } = params;
  const data = {
    date: date,
    coach_course_id: coach_course_id,
    slot: currentSlot,
  };
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/book-slot/`,
    headers: headers,
    data: data,
  });
};

export const get_appointement = async (params) => {
  const date = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/appointment`,
    headers: headers,
    params: { date: date.date },
  });
};

export const add_manual_payment = async (params) => {
  const {
    athlete_id,
    installments,
    offer_id,
    date,
    transaction_id,
    amount,
    mode,
  } = params;
  const data = {
    athlete_id: athlete_id,
    installments: installments,
    date: date,
    transaction_id: transaction_id,
    amount: amount,
    mode: mode,
  };
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/payment/coach/${offer_id}`,
    headers: headers,
    data: data,
  });
};
export const add_transaction = async (params) => {
  const {
    athlete_id,
    coach_id,
    installments,
    offer_id,
    transaction_id,
    amount,
    mode,
  } = params;
  const data = {
    athlete_id: athlete_id,
    coach_id: coach_id,
    installments: installments,
    transaction_id: transaction_id,
    amount: amount,
    mode: mode,
  };
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/transaction/coach/${offer_id}`,
    headers: headers,
    data: data,
  });
};


export const get_coach_by_gym_place = (params) => {
  const gym_id = params;
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/by_gym_place/${gym_id}`,
  });
};
export const get_athlete_active_courses_with_param = async (param) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/active-courses/${param}`,
    headers: headers,
  });
};

export const get_coach_athlete = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/athletes-under-me`,
    headers: headers,
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

export const get_coach_by_id = async (params) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/${params}`,
    headers: headers,
  });
};

export const get_coach_me = async (navigation) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/me`,
    headers: headers,
  });
};
export const updateCoach = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  console.log(headers);
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/me`,
    headers: headers,
    data: data,
  });
};

export const get_coach = async (navigation) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach`,
    headers: headers,
  });
};

export const verify_coach = async (navigation) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/verify-coach`,
    headers: headers,
  });
};

export const coach_forgot_password = async (params, navigation) => {
  const headers = await AuthService.getHeader();
  let user = await AsyncStorage.getItem(STORAGE.USER);
  user = JSON.parse(user);

  const data = new FormData();
  const attributes = Object.keys(params);
  attributes.forEach((attr) => data.append(`pro[${attr}]`, params[attr]));
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/forgot-password-coach`,
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
    url: `${API_URL}/auth/reset-password-coach`,
    data: data,
    headers: headers,
  });
};

export const is_pro_signed_in = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}pros/signed_in`,
    headers: headers,
  });
};

export const get_CalendarAppointement = async (params) => {
  const start_date = params.start_date;
  const end_date = params.end_date;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/calendar/`,
    headers: headers,
    params: { start_date: start_date, end_date: end_date },
  });
};
export const getUserAppoinement = async (userId) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/athlete/appointments/user/${userId}?upcoming=true`,
    headers: headers,
  });
};
