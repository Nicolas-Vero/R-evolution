import axios from 'axios';
import { API_URL } from '../configs/Constants';
import { getHeaders } from './Global';
// export const get_availabilities = (params) => {

//   console.log('oooo'.params);
//   return axios
//     .get(`http://localhost:3000/availability`, {
//       params: {
//         coachId: params.coachId,
//         availability_date: params.availability_date,
//       },
//     })
//     .then((response) => {
//    return  response['data'];
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   //}
// };
export const get_availabilities = async() => {
  const headers = await getHeaders();
  return axios({
    method:'GET',
    url:`${API_URL}/coach/availability`,
    headers:headers
  })
};
export const update_availabilities = async(params) => {
  const data =params
  const headers = await getHeaders();
  return axios({
    method:'POST',
    url:`${API_URL}/coach/availability`,
    headers:headers,
    data:data
  })
};

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

export const updateorcreate_availability = (params) => {
  return axios({
    method: 'POST',
    url: `http://localhost:3000/availability/add`,
    data: params,
  });
};

// export const update_availability = async (params) => {
//   console.log('totos', params);

//   // MiddleWare.validateRequest(
//   //   async () => {
//   //     const headers = await getHeaders();
//   //     const data = new FormData();
//   //     console.warn(params);
//   //     let attributes = Object.keys(params);
//   //     attributes = attributes.filter(attr => attr !== "id");
//   //     attributes.forEach(attr =>
//   //       data.append(`availability[${attr}]`, params[attr])
//   //     );
//   return axios
//   .post(`http://localhost:3000/availability/update`, {
//     params: {
//       id:params.id,
//       params:params.params
//     },
//   })
//   .then((response) => {
//  return  response['data'];
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
//   // return axios({
//   //   method: 'POST',
//   //   url: `http://localhost:3000/availability/update`,
//   //   data: params,
//   // });
//   //},
//   //    navigation)
// };
