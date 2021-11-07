import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';



export const get_commercial = () => {
  
    return axios({
      method: 'GET',
      url: `${API_URL}/commercials`,
    });
  };
