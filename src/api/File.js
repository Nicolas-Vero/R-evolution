import axios from 'axios';
import {API_URL} from '../configs/Constants';
import { getHeaders } from './Global';



export const upload_file = params => {
    const data = params;
    return axios({
      method: 'POST',
      url: `${API_URL}/file/s3/upload`,
      data: data,
    });
  };

export const get_file = params => {
    const data = params;
    return axios({
      method: 'GET',
      url: `${API_URL}/file/`,
      data: data,
      params:{title_content:data.title}
    });
  };