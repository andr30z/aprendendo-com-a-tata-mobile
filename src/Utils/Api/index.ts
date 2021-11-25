import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { USER_ASYNC_STORAGE_KEY } from "../../Contexts/User/Constants";
import { UserInterface } from "../../Interfaces/index";
import {
  ASYNC_STORAGE_COOKIE_KEY,
  baseApiRoutes,
  DEFAULT_URL,
} from "../../Services";

/**
 * Create token and credentials from user inside AsyncStorage.
 * @param res Axios response object.
 * @author andr3z0
 **/
export function setTokenAndCredentialsOnAsyncStorage(
  res: AxiosResponse<UserInterface>
) {
  const authCookies = res.request.responseHeaders["Set-Cookie"];
  // console.log(authCookies);
  AsyncStorage.setItem(ASYNC_STORAGE_COOKIE_KEY, authCookies);
  AsyncStorage.setItem(USER_ASYNC_STORAGE_KEY, JSON.stringify(res.data));
}

export async function clearTokenAndCredentials() {
  return await AsyncStorage.multiRemove([
    ASYNC_STORAGE_COOKIE_KEY,
    USER_ASYNC_STORAGE_KEY,
  ]);
}

export function formatFilePathUrl(path?: string) {
  if (!path) return;
  return DEFAULT_URL + "/" + baseApiRoutes.FILE_PREVIEW + path;
}


export function showError(error: any) {
  Toast.show({ type: "error", text1: "Erro", text2: error?.response?.data?.message || "Erro ao realizar a ação, tente novamente mais tarde." })
}