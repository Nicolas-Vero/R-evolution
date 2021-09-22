import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';
import MiddleWare from "./MiddleWare";




export const auth = params => {
  const data = params;
  return axios({
    method: 'POST',
    url: `${API_URL}/auth/coach/sign-up`,
    data: data
  });
};

export const sign_in = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/auth/coach-login`,
    data:data
  })
}

export const invite_prospect = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/coach/invite-athlete`,
    data:data
  })
}


export const get_appointement = async (params, navigation) => {
 // MiddleWare.validateRequest(
  
  //  async () => {
    const date =  params ; 
     const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}/coach/appointment`,
        headers: headers ,
        params: {date:date.date}
      })
 //   }
    //, navigation)
    };

export const add_manual_payment = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const data = params
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/coach/${params.id}`,
        headers: headers,
        data:data
      })
    }, navigation));

export const get_coach_by_gym_place = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/coach/exercise_place`,
        headers: headers,
        data:data
      })
    }, navigation));

export const get_coach_athlete = async () => {
      const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}/coach/athletes-under-me`,
        headers: headers,
      })
    };

export const cancel_booking = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/coach/cancel-booking/${params.id}`,
        headers: headers,
      })
    }, navigation));


export const get_coach_by_id = async (params) => {
   
      const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}/coach/${params}`,
        headers: headers
      })
}


export const get_coach_me = async (navigation) => {
  //MiddleWare.validateRequest(
 //   async () => {
      const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}/coach/me`,
        headers: headers
      })
   //}, navigation));
    }

export const get_coach = async (navigation) => {
      const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}/coach`,
        headers: headers
      })
    }


    export const verify_coach = async (navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/auth/verify-coach`,
        headers: headers
      })
    }, navigation));


    export const coach_forgot_password = async (params, navigation) => (
      MiddleWare.validateRequest(
        async () => {
          const headers = await getHeaders();
          let user = await AsyncStorage.getItem(STORAGE.USER);
          user = JSON.parse(user);
    
          const data = new FormData();
          const attributes = Object.keys(params);
          attributes.forEach(attr =>
            data.append(`pro[${attr}]`, params[attr])
          );
          return axios({
            method: 'POST',
            url: `${API_URL}/auth/forgot-password-coach`,
            data: data,
            headers: headers
          });
        }, navigation));    

        export const reset_password_mail_link = async (params, navigation) => (
          MiddleWare.validateRequest(
            async () => {
              const headers = await getHeaders();
              let user = await AsyncStorage.getItem(STORAGE.USER);
              user = JSON.parse(user);
        
              const data = new FormData();
              const attributes = Object.keys(params);
              attributes.forEach(attr =>
                data.append(`pro[${attr}]`, params[attr])
              );
              return axios({
                method: 'POST',
                url: `${API_URL}/auth/reset-password-coach`,
                data: data,
                headers: headers
              });
            }, navigation));   

export const is_pro_signed_in = async () => {
  const headers = await getHeaders();
  return axios({
    method: 'GET',
    url: `${API_URL}pros/signed_in`,
    headers: headers
  });
};

export const CalendarAppointement = async (params) => {
  const start_date = params.start_date;
  const end_date = params.end_date;
  const headers = await getHeaders();
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/calendar/`,
    headers: headers,
    params:{start_date:start_date,end_date:end_date}
  });
};


