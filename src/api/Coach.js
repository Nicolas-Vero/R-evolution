import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL, STORAGE } from '../configs/Constants';
import AuthService from '../services/AuthService';
import { request } from '../services/axiosService';

export const auth = async (data) => {
  return await request('POST', false, '/auth/coach/sign-up', null, data);
};

export const set_expo_token = async (token) => {
  return await request('POST', true, '/coach/expo-token', null, {
    expo_token: token,
  });
};
export const coach_login = async (params) => {
  const data = params;
  return await request('POST', false, `/auth/coach-login`, null, data);
};

export const invite_prospect = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/invite-athlete`,
    headers: headers,
    data: data,
  });
};

export const coach_booking_other = async (data) => {
  return await request('POST', true, '/coach/book-slot/other', null, data);
};

export const update_coach_booking_other = async (data, id) => {
  return await request('PUT', true, `/coach/book-slot/other/${id}`, null, data);
};

export const delete_coach_booking_other = async (id) => {
  return await request('DELETE', true, `/coach/book-slot/other/${id}`);
};

export const coach_booking = async (params) => {
  const { coach_id, date, athlete_course_id, slot, athlete_id } = params;
  const data = {
    date,
    athlete_course_id,
    slot,
    athlete_id,
    coach_id,
  };
  const headers = await AuthService.getHeader();
  return await axios({
    method: 'POST',
    url: `${API_URL}/coach/book-slot`,
    headers: headers,
    data,
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
export const get_appointement_calendar = async (params) => {
  const date = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/appointment`,
    headers: headers,
    params: { date: date },
  });
};
export const get_coachAthlete_status = async (params) => {
  const athlete_id = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach_athlete/status/${athlete_id}`,
    headers: headers,
  });
};
export const get_appointment_by_athlete_id = async (params) => {
  const athlete_id = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/appointment_by_user/${athlete_id}`,
    headers: headers,
  });
};
export const get_appointment_by_id = async (params) => {
  const booking_id = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/appointment_by_id/${booking_id}`,
    headers: headers,
  });
};

export const add_manual_payment = async (data) => {
  return await request(
    'POST',
    true,
    `/payment/coach/${data.offer_id}`,
    null,
    data,
  );
};

export const add_transaction = async (params) => {
  const { athlete_id, installments, offer_id, transaction_id, amount } = params;
  const data = {
    athlete_id: athlete_id,
    installments: installments,
    transaction_id: transaction_id.toString(),
    amount: amount,
  };

  return await request(
    'POST',
    true,
    `/transaction/coach/${offer_id}`,
    null,
    data,
  );
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
export const get_athlete_active_courses = async (param) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/athlete-active-courses/${param}`,
    headers: headers,
  });
};

export const cancel_booking = async (params) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/cancel-booking/${params.id}`,
    headers: headers,
  });
};
export const delete_prospect = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/delete/athlete`,
    headers: headers,
    data: data,
  });
};
export const unlink_prospect = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/unlink/athlete`,
    headers: headers,
    data: data,
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

export const get_coach_me = async () => {
  return await request('GET', true, '/coach/me');
};

export const updateCoach = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
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

export const coach_forgot_password = async (email) => {
  return await request('POST', false, '/auth/forgot-password-coach', null, {
    email,
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
export const athletePendingPayment = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/athlete/pendingPayment`,
    headers: headers,
  });
};

export const updateAthleteSheet = async (data, athlete_id) => {
  const headers = await AuthService.getHeader();

  return axios({
    method: 'POST',
    url: `${API_URL}/coach/athlete/sheet/${athlete_id}`,
    headers: headers,
    data,
  });
};
export const delete_athlete = async (athleteId) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/delete/athlete`,
    headers: headers,
    data: {
      athlete_id: athleteId,
    },
  });
};

export const unlink_athlete = async (athleteId) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach/unlink/athlete`,
    headers: headers,
    data: {
      athlete_id: athleteId,
    },
  });
};

export const removeCoachExpoToken = async (token) => {
  return await request('DELETE', true, `/coach/del-expo-token/${token}`);
};
