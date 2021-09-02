import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';
import MiddleWare from "./MiddleWare";


export const create_paiement = async (params) => {
    const {coach_id, installments, offer_id} = params 
   const data = {coach_id:coach_id,installments:installments}
    const headers = await getHeaders();
    return axios({
      method: 'POST',
      url: `${API_URL}/payment/create-payment/${offer_id}`,
      headers: headers,
      data:data
    })
  };


export const get_paiement_for_coach = async () => {
    const headers = await getHeaders();
    return axios({
      method: 'GET',
      url: `${API_URL}/payment/made-for-coach`,
      headers: headers,
    })
  };


export const get_payment_by_athlete = async () => {
    const headers = await getHeaders();
    return axios({
      method: 'GET',
      url: `${API_URL}/payment/made-for-coach`,
      headers: headers,
    })
  };


export const get_payment_status = async () => {
    const headers = await getHeaders();
    return axios({
      method: 'GET',
      url: `${API_URL}/payment/made-for-coach`,
      headers: headers,
    })
  };


export const get_payment_EMIS_status = async () => {
    const headers = await getHeaders();
    return axios({
      method: 'GET',
      url: `${API_URL}/payment/made-for-coach`,
      headers: headers,
    })
  };


export const get_payment_by_id = async () => {
    const headers = await getHeaders();
    return axios({
      method: 'GET',
      url: `${API_URL}/payment/made-for-coach`,
      headers: headers,
    })
  };


export const get_payment_by_payment_id = async () => {
    const headers = await getHeaders();
    return axios({
      method: 'GET',
      url: `${API_URL}/payment/made-for-coach`,
      headers: headers,
    })
  };