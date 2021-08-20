import axios from 'axios';
import {API_URL} from '../configs/Constants';
import { getHeaders } from './Global';



export const upload_file = params => {
    const data = params;
    const headers = getHeaders();
    return axios({
      method: 'POST',
      url: `${API_URL}/file/s3/upload`,
      data: data,
      headers:headers
    });
  };

export const get_file = params => {
    const data = params;
    const headers = getHeaders();
    return axios({
      method: 'GET',
      url: `${API_URL}/file/`,
      data: data,
      headers:headers,
      params:{title_content:data.title}
    });
  };