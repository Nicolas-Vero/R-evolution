import axios from 'axios';
import {API_URL} from '../configs/Constants';

/*
* Method: POST
* Desc: Allow a profession to log in
* Notes: In the headers, you get 'access-token', 'token-name' (always => 'Bearer'),
*        'uid', 'client', and 'expiry', to access the other resources.
*        For security reasons, 'access-token' and 'expiry' change at each request to the api.
*        Test Log In = email: test@api.fr; password: test@api.fr
*
* Params:
* email     | form | string | (req)
* password  | form | string | (req)
* */
export const sign_in = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`http://localhost:3000/signin`,
    data: data
  }).then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  })
}