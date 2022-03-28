import axios from 'axios';
import { API_URL, STORAGE } from '../configs/Constants';

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

  try {
    const res = await axios.request({
      method,
      baseURL: API_URL,
      url: route,
      headers: reqHeaders,
      params: query,
      data: body,
      validateStatus: status => {
        return status < 500;
      },
    });

    return {
      status: res.status,
      content: res.data,
    };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
      };
    }

    return {};
  }
};

export default {request};
