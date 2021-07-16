import axios from 'axios';
import {AsyncStorage} from 'react-native'


const fetchGym = dispatch => async () => {

    // const response = await gymApi.get('/gym');
    return axios({
      method: 'GET',
      url: `http://localhost:3000/gym`,
      data: data
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  };


