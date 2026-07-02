import AuthService from '../services/AuthService';
export const getHeaders = async () => {
  let headers = await AuthService.getHeader();
  if (!headers) return null;

  return headers;
};
