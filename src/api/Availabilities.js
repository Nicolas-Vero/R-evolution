import axios from 'axios';



export const get_availabilities = async (params) => (

      async () => {
        const headers = await getHeaders();
        const queryParams = buildQueryParams(params);
        return axios({
          method: 'GET',
          url: `${API_URL}availabilities${queryParams}`,
          headers: headers
        });
      }
  );
  


  export const update_availability = async (params) => (
    async()=>{
        const headers = await getHeaders();
        const data = new FormData();
        console.warn(params);
        let attributes = Object.keys(params);
        attributes = attributes.filter(attr => attr !== "id");
        attributes.forEach(attr =>
          data.append(`availability[${attr}]`, params[attr])
        );
  
        return axios({
          method: 'PATCH',
          url: `${API_URL}availabilities/${params.id}`,
          data: data,
          headers: headers
        });
    }
  );