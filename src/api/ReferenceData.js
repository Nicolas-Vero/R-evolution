import axios from 'axios';
import {AsyncStorage} from 'react-native'


export const get_gym = async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `http://localhost:4001/api/v1/gyms`,
    })
  };

  
export const get_goal = async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `http://localhost:4001/api/v1/goals`,
    })
  };


export const get_specialities = async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `http://localhost:4001/api/v1/specialties`,
    })
  };


export const get_exercice_places= async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `http://localhost:4001/api/v1/exercise-places`,
    })
  };


