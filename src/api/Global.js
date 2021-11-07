import AuthService from '../services/AuthService';
export const getHeaders = async () => {
  let headers = await AuthService.getHeader();
  console.log('headers', headers);
  if (!headers) return null;

  return headers;
};
