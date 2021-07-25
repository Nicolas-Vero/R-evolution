import axios from 'axios';

export const get_availabilities = (params) => {
  // async () => {
  //   const headers = await getHeaders();
  //   const queryParams = buildQueryParams(params);
  // console.log('paraaams',navigation)
  // return await axios({
  //   method: 'GET',
  //   url: `http://localhost:3000/availability`,
  //   data:params
  // }).then ((res)=>{console.log('resultat',res)})
  console.log('oooo'.params);
  return axios
    .get(`http://localhost:3000/availability`, {
      params: {
        coachId: params.coachId,
        availability_date: params.availability_date,
      },
    })
    .then((response) => {
   return  response['data'];
    })
    .catch(function (error) {
      console.log(error);
    });

  //}
};

export const updateorcreate_availability = (params) => {
  return axios({
    method: 'POST',
    url: `http://localhost:3000/availability/add`,
    data: params,
  });
};

export const update_availability = async (params) => {
  console.log('totos', params);

  // MiddleWare.validateRequest(
  //   async () => {
  //     const headers = await getHeaders();
  //     const data = new FormData();
  //     console.warn(params);
  //     let attributes = Object.keys(params);
  //     attributes = attributes.filter(attr => attr !== "id");
  //     attributes.forEach(attr =>
  //       data.append(`availability[${attr}]`, params[attr])
  //     );
  return axios
  .post(`http://localhost:3000/availability/update`, {
    params: {
      id:params.id,
      params:params.params
    },
  })
  .then((response) => {
 return  response['data'];
  })
  .catch(function (error) {
    console.log(error);
  });
  // return axios({
  //   method: 'POST',
  //   url: `http://localhost:3000/availability/update`,
  //   data: params,
  // });
  //},
  //    navigation)
};
