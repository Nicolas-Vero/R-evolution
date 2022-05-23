import axios from 'axios';
import { API_URL } from '../configs/Constants';
import AuthService from '../services/AuthService';
import { request } from '../services/axiosService';

export const create_paiement = async (params) => {
  const { coach_id, installments, offer_id, date, transaction_id } = params;
  const data = {
    coach_id: coach_id,
    installments: installments,
    date: date,
    transaction_id: transaction_id,
  };
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/payment/create-payment/${offer_id}`,
    headers: headers,
    data: data,
  });
};
export const update_paiement = async (params) => {
  const {
    athlete_id,
    offer_id,
    installments,
    amount,
    transaction_id,
    status,
    id,
    date,
    mode,
    is_validate,
  } = params;
  const data = {
    offer_id,
    amount,
    status,
    installments,
    transaction_id,
    date,
    athlete_id,
    mode,
    is_validate,
  };
  if (id) {
    data.id = id;
  }

  return await request('POST', true, '/transaction/update/coach', null, data);
};

export const remove_paiement = async (params) => {
  const { transaction_id, id } = params;
  const data = { id: id, transaction_id: transaction_id };
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/transaction/remove/coach`,
    headers: headers,
    data: data,
  });
};

export const get_paiement_for_coach = async (params) => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/transaction/made-for-coach/${params}`,
    headers: headers,
  });
};

export const get_payment_details = async (params) => {
  const headers = await AuthService.getHeader();
  const data = params;
  return axios({
    method: 'GET',
    url: `${API_URL}/payment/made-for-coach/${data}`,
    headers: headers,
  });
};

export const get_payment_status = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/payment/made-for-coach`,
    headers: headers,
  });
};

export const get_payment_EMIS_status = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/payment/made-for-coach`,
    headers: headers,
  });
};

export const get_payment_by_id = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/payment/made-for-coach`,
    headers: headers,
  });
};

export const get_payment_by_payment_id = async () => {
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/payment/made-for-coach`,
    headers: headers,
  });
};
