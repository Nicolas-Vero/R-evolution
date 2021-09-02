import axios from 'axios';
import {API_URL} from '../configs/Constants';

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
export const auth = params => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/api/v1/auth/coach/sign-up`,
    data: data
  });
};
export const AddMoreInfo = params => {
  const data = params;
  // data.append('email', params.email);
  // data.append('password', params.password);
  // data.append('first_name', params.first_name);
  // data.append('last_name', params.last_name);
  // data.append('phone', params.phone);
  // data.append('degrees', params.degrees);
  // data.append('xp_years', params.xp_years);
  // data.append('avatar', params.avatar);
  return axios({
    method: 'POST',
    url: `http://localhost:3000/user/update`,
    data: data
  });
};
