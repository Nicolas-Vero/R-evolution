import axios from 'axios';
//import {API_URL} from '../configs/Constants';

export const Task = params => {   
      const data = {coachId:1};
        return axios({
          method: 'POST',
          url: `http://localhost:3000/rdvday`,
          data: data,
        }).then(response=>{
       return response.data
        });
};