import AsyncStorage from '@react-native-async-storage/async-storage';

let isTokenRefreshing = false;

export default class AuthService {
  static init = async () => {
    // -- compatibilité V1
    const auth = await AuthService.getAuth();
    // if (!auth) {
    //   const json = await AsyncStorage.getItem('AuthorizationToken');
    //   if (json) {
    //     const auth_v1 = JSON.parse(json);
    //     await AuthService.setAuth(auth_v1);
    //     await AsyncStorage.removeItem('AuthorizationToken');
    //   }
    // }

    return auth;
  };

  static getAuth = async () => {
    const json = await AsyncStorage.getItem('auth');
    if (!json) {
      return null;
    }

    return JSON.parse(json);
  };

  static getUser = async () => {
    const json = await AsyncStorage.getItem('user');
    if (!json) {
      return null;
    }

    return JSON.parse(json);
  };

  static getHeader = async () => {
    const auth = await this.getAuth();

    if (!auth) return null;

    return auth.headers;
  };

  static getUserId = async () => {
    const auth = await AuthService.getAuth();
    return !auth ? null : auth.userId;
  };

  static setAuth = async (data) => {
    await AsyncStorage.setItem('auth', JSON.stringify(data));
  };

  static setUser = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  static removeAuth = async () => {
    await AsyncStorage.removeItem('auth');
  };

  static authenticate = async () => {
    const auth = await AuthService.getAuth();

    if (!auth) {
      return null;
    }

    const currentDate = new Date();

    const refreshTokenExpiration = new Date(
      auth.refreshTokenExpiration,
    ).setSeconds(new Date(auth.refreshTokenExpiration).getSeconds() - 30);

    if (currentDate > refreshTokenExpiration) {
      await AuthService.removeAuth();
      return null;
    }

    const authorizationTokenExpiration = new Date(
      auth.authorizationTokenExpiration,
    ).setSeconds(new Date(auth.authorizationTokenExpiration).getSeconds() - 30);

    if (currentDate > authorizationTokenExpiration) {
      if (!isTokenRefreshing) {
        return AuthService.refreshAuth();
      }
      while (isTokenRefreshing) {
        await SystemHelper.sleep(200);
      }
      return AuthService.authenticate();
    }

    return auth;
  };

  static updateAuth = async (auth) => {
    await AuthService.setAuth(auth);
  };

  static logout = async () => {
    //TODO Create logout API request and call it
    await AuthService.removeAuth();

    // TODO redirect to entry
    return true;
  };

  static refreshAuth = async () => {
    // isTokenRefreshing = true;
    // const auth = await AuthService.getAuth();
    // const res = await RequestHelper.refreshAuthToken(auth.refreshToken);
    // if (res && res.status === 201) {
    //     await AuthService.setAuth(res.content.data);
    //     isTokenRefreshing = false;
    //     return res.content.data;
    // }
    // await AuthService.removeAuth();
    // isTokenRefreshing = false;
    // return null;
  };
}
