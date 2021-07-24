import axios from 'axios';



export const get_availabilities = async (params) => {
      // async () => {
      //   const headers = await getHeaders();
      //   const queryParams = buildQueryParams(params);
        return axios({
          method: 'GET',
          url: `http://localhost:3000/availability`,
          data:params
        })
      
      //}
      };
  


  export const updateorcreate_availability = (params) => {
        return axios({
          method: 'POST',
          url: `http://localhost:3000/availability/add`,
          data: params,
        });
      };

      export const update_availability = async (params, navigation) => {
        console.log('totos',params);
        
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
      
            return axios({
              method: 'PATCH',
              url: `http://localhost:3000/availability/update`,
              data: params,
            });
          //},
       //    navigation)
        };
      