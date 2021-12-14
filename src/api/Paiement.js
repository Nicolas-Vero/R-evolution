import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, STORAGE } from '../configs/Constants';
import AuthService from '../services/AuthService';

export const create_paiement = async (params) => {
  const { coach_id, installments, offer_id, date, transaction_id } = params;
  const data = { coach_id: coach_id, installments: installments, date:date, transaction_id:transaction_id};
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/payment/create-payment/${offer_id}`,
    headers: headers,
    data: data,
  });
};
export const update_paiement = async (params) => {
  
  const {athlete_id, offer_id, installments, amount, transaction_id, status,id,date } = params;
  const  data = {offer_id:offer_id,amount:amount,status:status, installments: installments, transaction_id:transaction_id, date:date, athlete_id:athlete_id};
  if (id) 
  {
    data.id = id;
  }
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/transaction/update/coach`,
    headers: headers,
    data: data,
  });
};
export const remove_paiement = async (params) => {
  const {transaction_id,id } = params;
  const  data = {id:id, transaction_id:transaction_id};
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
  const data = params
  return axios({
    method: 'GET',
    url:`${API_URL}/payment/made-for-coach/${data}`,
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
