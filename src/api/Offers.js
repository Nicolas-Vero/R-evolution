import axios from 'axios';
import { API_URL } from '../configs/Constants';
import AuthService from '../services/AuthService';
/*
 * Method: POST
 * Desc: Allows a professional to register
 * Notes: In the headers, you get 'access-token', 'token-name' (always => 'Bearer'),
 *        'uid', 'client', and 'expiry', to access the other resources.
 *        For security reasons, 'access-token' and 'expiry' change at each request to the api.
 *        Test Log In = email: test@api.fr; password: test@api.fr
 *
 * Params:
 * email     | form | string | (req)
 * password  | form | string | (req)
 * */

export const AddOffer = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'PUT',
    url: `${API_URL}/coach-offer`,
    data: data,
    headers: headers,
  });
};

export const UpdateOffer = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'POST',
    url: `${API_URL}/coach-offer`,
    data: data,
    headers: headers,
  });
};
export const get_coach_offers = async () => {
  const headers = await AuthService.getHeader();

  return axios({
    method: 'GET',
    url: `${API_URL}/coach-offers`,
    headers: headers,
  });
};

export const delete_coach_offers = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'DELETE',
    url: `${API_URL}/coach-offer`,
    headers: headers,
    data: data,
  });
};

export const get_coach_offer_by_id = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach-offers/coach/${data}`,
    headers: headers,
  });
};

export const get_coach_specific_offers = async (params) => {
  const data = params;
  const headers = await AuthService.getHeader();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach-offers/${params.id}`,
    headers: headers,
  });
};
