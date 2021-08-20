import axios from 'axios';
import {API_URL} from '../configs/Constants';
import { getHeaders } from './Global';

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


export const AddOffer = params => {
  const data = params;
  return axios({
    method: 'PUT',
    url: `h${API_URL}/coach-offer`,
    data: data,
    headers: {
      Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MjkyMTIzMjY4ODgsImV4cCI6MTYzMDQyMTkyNjg4OCwidXNlciI6eyJpZCI6NCwidHlwZSI6ImNvYWNoIiwiZmlyc3RfbmFtZSI6InRvdG8iLCJsYXN0X25hbWUiOiJ0b290byJ9fQ.jNBxXqV3CwucvvMq28uCFrDi1D-B0_VUSvg77lsasvYvk6m4sQsoTVumUjnuEMl3po-cZz9-r76Otr4NugZedw' //the token is a variable which holds the token
    }
  });
};
export const get_coach_offers = params => {
  const data = params;

  return axios({
    method: 'POST',
    url: `${API_URL}/coach-offers`,
    data: data
  });
};

export const get_coach_specific_offers = params => {
  const data = params;
 const headers = getHeaders();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach-offers/${params.id}`,
    headers:headers
  });
};
