import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export const DEFAULT_URL = "http://192.168.1.64:8080/api";

export const ASYNC_STORAGE_COOKIE_KEY = "app_auth_cookies";
export const baseApi = Axios.create({
  baseURL: DEFAULT_URL,
  withCredentials: true,
  headers: {},
});

export const baseApiRoutes = {
  ACTIVITIES: "/v1/activities",
  LOGIN: "/v1/authentication/login",
  REFRESH: "/v1/authentication/refresh",
  USERS: "/v1/users",
  ME: "v1/users/me",
};

//set cookie authentication on every request
baseApi.interceptors.request.use(async (config) => {
  const cookies = await AsyncStorage.getItem(ASYNC_STORAGE_COOKIE_KEY);
  console.log(cookies?.split('Refresh'));
  if (cookies) {
    return {
      ...config,
      Cookie: cookies,
    };
  }

  return config;
});
