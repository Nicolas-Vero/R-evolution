import {errorHandler, validToken, get, post, put, del} from './common';
import * as types from './types';
import {clearToken} from '../reducers/session';

// export const createAuth = payload => {
//   return dispatch => {
//     clearToken();
//     return post('/users/sign_in', payload).then(response => {
//       if (response.resultType === 'success') {
//         dispatch({
//           type: types.AUTH_USER,
//           payload: response.result.data.payload,
//         });
//       } else if (
//         response.result.data.reason &&
//         response.result.data.reason === 'MISSING_OTP_CODE'
//       ) {
//         dispatch({type: types.OTP_ENABLED});
//       } else {
//         errorHandler(
//           dispatch,
//           response.result,
//           types.API_ERROR,
//           response.result.data.message,
//         );
//       }
//     });
//   };
// };

// export const destroyAuth = () => {
//   return dispatch => {
//     return del('/users/sign_out').then(response => {
//       if (response.resultType === 'success' || response.result.status === 404) {
//         dispatch({type: types.UNAUTH_USER});
//       }
//     });
//   };
// };

// export const validateAuthToken = () => {
//   return dispatch => {
//     if (validToken()) {
//       dispatch({type: types.VALIDATE_AUTH_TOKEN});
//       return get('/users/validate_token').then(response => {
//         if (response.resultType == 'success') {
//           dispatch({
//             type: types.AUTH_USER,
//             payload: response.result.data.payload,
//           });
//         } else {
//           dispatch({type: types.API_ERROR});
//         }
//       });
//     }
//   };
// };

// export const fetchAuthorizedCountries = () => {
//   return dispatch => {
//     return get('/users/sign_up').then(response => {
//       if (response.resultType === 'success') {
//         dispatch({
//           type: types.FETCH_AUTHORIZED_COUNTRIES,
//           payload: response.result.data.payload,
//         });
//       } else {
//         errorHandler(
//           dispatch,
//           response.result,
//           types.API_ERROR,
//           response.result.data.message,
//         );
//       }
//     });
//   };
// };

// export const resetWaitingConfirmation = () => {
//   return dispatch => {
//     dispatch({
//       type: types.RESET_WAITING_CONFIRMATION,
//     });
//   };
// };

// export const confirmAccount = confirmationToken => {
//   // Redirect url is actually hardcoded and should match
//   // the url set in corresponding ClientApplication,
//   // otherwise API will raise.
//   return dispatch => {
//     return get(
//       `/users/confirmation?confirmation_token=${confirmationToken}&redirect_url=https://bitit.io/app/sign_up`,
//     ).then(response => {
//       if (response.resultType === 'success') {
//         dispatch({
//           type: types.CONFIRMED_USER,
//           authTokenUrl: response.result.request.responseURL,
//         });
//       } else {
//         errorHandler(
//           dispatch,
//           response.result,
//           types.API_ERROR,
//           response.result.data.message,
//         );
//       }
//     });
//   };
// };
