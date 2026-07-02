import axios from 'axios';
import {API_URL} from '../configs/Constants';
import AuthService from '../services/AuthService';
import { getHeaders } from './Global';



export const upload_file = ( params) => {
    const data = params;
    return axios({
      method: 'POST',
      url: `${API_URL}/file/s3/upload`,
      data: data,
    });
  };

export const get_file = async(params) => {
  const headers = await AuthService.getHeader();
    const data = params;
    return axios({
      method: 'GET',
      url: `${API_URL}/file/s3/${data}`,
      headers:headers
    });
  };

  export const upload_profile_picture = (userId, userType, image) => {
    return axios({
      method: 'POST',
      url: `${API_URL}/file/profilePicture/${userId}`,
      data: {
        userType,
        image
      },
    });
  };