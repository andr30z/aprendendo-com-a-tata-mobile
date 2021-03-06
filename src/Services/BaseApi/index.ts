import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

// export const DEFAULT_URL = "http://192.168.1.3:8080/api";
export const DEFAULT_URL = "http://192.168.1.64:8080/api";

export const ASYNC_STORAGE_COOKIE_KEY = "app_auth_cookies";
export const baseApi = Axios.create({
  baseURL: DEFAULT_URL,
  withCredentials: true,
  headers: {},
});

const classUserRoute = (classId: string) => `v1/classrooms/${classId}/users`;

export const baseApiRoutes = {
  ACTIVITIES: "/v1/activities",
  LOGIN: "/v1/authentication/login",
  REFRESH: "/v1/authentication/refresh",
  REGISTER: "/v1/authentication/register",
  LOGOUT: "/v1/authentication/logout",
  USERS: "/v1/users",
  RESPONSIBLE_USER_CHILDREN: "/v1/user-responsible/children",
  ME: "v1/users/me",
  USER_RESPONSIBLE_REQUEST: "/v1/user-responsible/request",
  ACTIVITY_RESULT_USER_RESPONSIBLE: "/v1/activities-results/user-responsible",
  CLASSROOMS: "v1/classrooms",
  USERS_PASSWORD: "/v1/users/password",
  NOTIFICATION: "v1/notifications",
  USER_NOTIFICATIONS: "v1/notifications/users",
  USER_RESPONSIBLE: "v1/user-responsible",
  USER_RESPONSIBLE_CHILD: "v1/user-responsible/child",
  CLASSES_BY_USERS: "v1/classrooms/users",
  CLASS_USER: classUserRoute,
  CLASSROOMS_USERS: (classId: string, userId: string) =>
    `${classUserRoute(classId)}/${userId}`,
  CLASSROOM_JOIN_REQUEST: (classId: string) =>
    `v1/classrooms/${classId}/join-request`,
  CLASSROOM_JOIN_REQUEST_RESOLVE: (classId: string, userId: string) =>
    `v1/classrooms/${classId}/join-request/${userId}`,
  ACTIVITY_RESULT_USERS: "v1/activities-results/users",
  START_POST_ACTIVITY: (postId: string) => `v1/posts/${postId}/start-activity`,
  POSTS: "v1/posts",
  POSTS_BY_CLASSES: (classId: string) => `v1/classrooms/${classId}/posts`,
  FILE_PREVIEW: "v1/files?path=",
  FILE_UPLOAD: "v1/files/upload",
};

//set cookie authentication on every request
baseApi.interceptors.request.use(async (config) => {
  const cookies = await AsyncStorage.getItem(ASYNC_STORAGE_COOKIE_KEY);
  // console.log(cookies?.split("Refresh"),config);
  console.log(config.url);
  if (cookies) {
    return {
      ...config,
      Cookie: cookies,
    };
  }

  return config;
});
