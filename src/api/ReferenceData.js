import axios from 'axios';
import {AsyncStorage} from 'react-native'
import { API_URL } from '../configs/Constants';


export const get_gym = async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `${API_URL}/gyms`,
    })
  };

  
export const get_goal = async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `${API_URL}/goals`,
    })
  };


export const get_specialities = async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `${API_URL}/specialties`,
    })
  };


export const get_exercice_places= async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `${API_URL}/exercise-places`,
    })
  };


