import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';
import MiddleWare from "./MiddleWare";




export const sign_in = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/auth/athlete-login`,
    data:data
  })
}

export const athlete_appointement = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/athlete/appointments`,
    data:data
  })
}

export const athlete_appointement_today = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/athlete/appointments`,
    params:{today:data.today}
  })
}

export const athlete_appointement_upcoming = params=> {
  const data = params;
  return axios({
    method: 'POST',
    url:`${API_URL}/athlete/appointments`,
    params:{upcoming:data.upcoming}
  })
}

export const athlete_active_appointement = async(params)=> {
    const headers = await getHeaders();
  return axios({
    method: 'POST',
    url:`${API_URL}/athlete/active-appointments`,
    headers:headers
  })
}

export const get_athlete_appointement = async(params)=> {
    const headers = await getHeaders();
  return axios({
    method: 'GET',
    url:`${API_URL}/athlete/appointments`,
    headers:headers
  })
}


export const sign_up = async (params, navigation) => (

  MiddleWare.validateRequest(
    async () => {
        const data = params ;
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/auth/athlete/sign-up/`,
        headers: headers,
        data:data
      })
    }, navigation));

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

/*
* Desc: Returns a single Pro item
* Params:
* id            | path | string | (req)
* access-token  | header | string | (req)
* token-name    | header | string | (req)
* client        | header | string | (req)
* uid           | header | string | (req)
* expiry        | header | string | (req)
* */

export const get_athlete_by_id = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}/athlete/${params.id}`,
        headers: headers
      })
    }, navigation));


export const get_athlete = async () => {
  //MiddleWare.validateRequest(
      const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}/athlete/me`,
        headers: headers
      })
    
  }
    //));

    export const verify_athlete = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const data = params
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/auth/verify-athlete`,
        headers: headers,
        data:data
      })
    }, navigation));


    export const athlete_change_password = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const data = params
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/auth/change-password-athlete`,
        headers: headers,
        data:data
      })
    }, navigation));


    export const athlete_accept_invitation = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const data = params
      const headers = await getHeaders();
      return axios({
        method: 'POST',
        url: `${API_URL}/auth/accept-invitation-athlete`,
        headers: headers,
        data:data
      })
    }, navigation));


/*
* Desc: Update the current pro
* Params:
* id            | path | integer | (req)
* ...pro[attr]  | form | string | (opt)
* access-token  | header | string | (req)
* token-name    | header | string | (req)
* client        | header | string | (req)
* uid           | header | string | (req)
* expiry        | header | string | (req)
* */
export const update_current_athlete = async (params, navigation) => (
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
        url: `${API_URL}/athlete/me/`,
        data: data,
        headers: headers
      });
    }, navigation));

export const update_athlete_password = async (params, navigation) => (
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
        url: `${API_URL}/auth/change-password-athlete`,
        data: data,
        headers: headers
      });
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
            url: `${API_URL}/auth/forgot-password-athlete`,
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
                url: `${API_URL}/auth/reset-password-athlete`,
                data: data,
                headers: headers
              });
            }, navigation));

/*
* Desc: Return true if the pro is signed in, otherwise, it returns a status 401
* Params:
* access-token  | header | string | (req)
* token-name    | header | string | (req)
* client        | header | string | (req)
* uid           | header | string | (req)
* expiry        | header | string | (req)
* */
export const is_Athlete_signed_in = async () => {
  const headers = await getHeaders();
  return axios({
    method: 'GET',
    url: `${API_URL}/pros/signed_in`,
    headers: headers
  });
};

export const CalendarAppointement = async (params) => {
  const headers = await getHeaders();
  const  start_date = params.start_date;
  const  end_date = params.end_date;
  return axios({
    method: 'GET',
    url: `${API_URL}/coach/calendar/`,
    headers: headers,
    params:{start_date:start_date,end_date:end_date}
  });
};


