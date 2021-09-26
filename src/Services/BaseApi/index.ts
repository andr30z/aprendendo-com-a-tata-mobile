import Axios from "axios";

export const baseApi = Axios.create({
  baseURL: "http://192.168.1.64:8080/api",
});

export const baseApiRoutes = {
  ACTIVITIES: "/v1/activities",
};
