import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_URL, STORAGE} from '../configs/Constants';
import {getHeaders} from './Global';
import MiddleWare from "./MiddleWare";

/*
* Desc: Returns all pros paginate by 8 (default page is : 1)
* Params:
* Page          | form | string | (opt)
* access-token  | header | string | (req)
* token-name    | header | string | (req)
* client        | header | string | (req)
* uid           | header | string | (req)
* expiry        | header | string | (req)
* */
export const get_pros = async (params = {page: 1}, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const headers = await getHeaders();
      const data = new FormData();
      data.append('Page', params.page);
      return axios({
        method: 'GET',
        url: `${API_URL}pros`,
        data: data,
        headers: headers
      });
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
export const get_pro_by_id = async (params, navigation) => (
  MiddleWare.validateRequest(
    async () => {
      const headers = await getHeaders();
      return axios({
        method: 'GET',
        url: `${API_URL}pros/${params.id}`,
        headers: headers
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
export const update_current_pro = async (params, navigation) => (
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
        method: 'patch',
        url: `${API_URL}pros/${user.id}`,
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
export const is_pro_signed_in = async () => {
  const headers = await getHeaders();
  return axios({
    method: 'GET',
    url: `${API_URL}pros/signed_in`,
    headers: headers
  });
};