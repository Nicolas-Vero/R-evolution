import axios from 'axios';
import { API_URL, STORAGE } from '../configs/Constants';
import AuthService from './AuthService';

export const request = async (
  method,
  needAuth,
  route,
  query,
  body,
  headers,
) => {
  // TODO TO COMPLETE
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const reqHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  if (needAuth) {
    const headers = await AuthService.getHeader();
    if (headers && headers.Authorization) {
      reqHeaders.Authorization = headers.Authorization;
    } else {
      return null;
    }
  }

  try {
    const res = await axios.request({
      method,
      baseURL: API_URL,
      url: route,
      headers: reqHeaders,
      params: query,
      data: body,
      validateStatus: (status) => {
        return status < 500;
      },
    });
    console.log(res.status, 'res', res.data);
    return {
      status: res.status,
      content: res.data,
    };
  } catch (err) {
    console.log(err, 'err');

    if (err.response) {
      return {
        status: err.response.status,
      };
    }

    return {};
  }
};

export default { request };
