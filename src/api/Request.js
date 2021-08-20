import axios from 'axios';
import {API_URL} from '../configs/Constants';

export const get_request = () => {   
        return axios({
          method: 'GET',
          url: `${API_URL}/requests`,
        })
};

export const assign_request = params => {   
      const data = params,
        return axios({
          method: 'POST',
          url: `${API_URL}/request/assign`,
          data: data
        })
};

export const active_request = params => {   
      const data = params,
        return axios({
          method: 'GET',
          url: `${API_URL}/request/me`,
          data: data
        })
};