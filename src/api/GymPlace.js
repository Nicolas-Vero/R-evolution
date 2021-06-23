import axios from 'axios';
import {AsyncStorage} from 'react-native'


const fetchGym = dispatch => async () => {

    const response = await gymApi.get('/gym');
    dispatch({ type: 'fetch_gym', payload: response.data });

  };

