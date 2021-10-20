import axios from 'axios';
import {API_URL} from '../configs/Constants';
import {getHeaders} from './Global';




export const get_public_request = async() => {   
  const headers = await getHeaders();
        return axios({
          method: 'GET',
          url: `${API_URL}/requests`,
          headers:headers
        })
};

export const assign_request = async(params)  => { 
  const headers = await getHeaders();  
      const id = params
        return axios({
          method: 'POST',
          url: `${API_URL}/request/assign`,
          data:{request_id:id},
          headers:headers
        })
};

export const get_personnal_request = async() => {   

  const headers = await getHeaders();
        return axios({
          method: 'GET',
          url: `${API_URL}/coach/request/me`,
        headers:headers
        })
};