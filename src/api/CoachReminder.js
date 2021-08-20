import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';
import MiddleWare from "./MiddleWare";




export const coach_reminder = params=> {
  const data = params;
  return axios({
    method: 'PUT',
    url:`http://localhost:4001/api/v1/coach-reminder`,
    data:data
  })
}

export const get_coach_reminder = params=> {
  const data = params;
  return axios({
    method: 'GET',
    url:`http://localhost:4001/api/v1/coach-reminder`,
  })
}

export const get_coach_reminder = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`http://localhost:4001/api/v1/coach-reminder`,
    data:data
  })
}

export const get_coach_reminder = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`http://localhost:4001/api/v1/coach-reminder/status`,
    data:data
  })
}

export const get_coach_reminder = params=> {
  const data = params;
  return axios({
    method: 'DELETE',
    url:`http://localhost:4001/api/v1/coach-reminder`,
    data:data
  })
}