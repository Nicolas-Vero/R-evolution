import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';
import MiddleWare from "./MiddleWare";




export const coach_reminder = async(params)=> {
  const data = params;
  const {title, content,status, color} = params
  const headers = await getHeaders();
  return axios({
    method:'PUT',
    url:`${API_URL}/coach-reminder`,
    data:{title:title,content:content,status:status,color:color},
    headers:headers
  })
}

export const get_coach_reminder = async()=> {
  const headers = await getHeaders();
  return axios({
    method: 'GET',
    url:`${API_URL}/coach-reminder`,
    headers:headers
  })
}

export const reminder_status_update = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/coach-reminder`,
    data:data
  })
}

export const reminder_update = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/coach-reminder/status`,
    data:data
  })
}

export const delete_reminder = params=> {
  const data = params;
  return axios({
    method: 'DELETE',
    url:`${API_URL}/coach-reminder`,
    data:data
  })
}