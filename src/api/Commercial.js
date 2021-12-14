import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';



export const get_commercial_by_place = (params) => {
    const gym_place_id = params;
    return axios({
      method: 'GET',
      url: `${API_URL}/commercials/by_gym_place/${gym_place_id}`,
    });
  };
