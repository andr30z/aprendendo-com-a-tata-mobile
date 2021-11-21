import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  SetStateInterface,
  UserInterface,
  UserType,
} from "../../Interfaces/index";
import {
  ASYNC_STORAGE_COOKIE_KEY,
  baseApi,
  baseApiRoutes,
  DEFAULT_URL,
} from "../../Services";
import { setTokenAndCredentialsOnAsyncStorage } from "../../Utils";
import { USER_ASYNC_STORAGE_KEY } from "./Constants";
type UserComposition = UserInterface | null;
interface UserContextInterface {
  user: UserComposition;
  setUser: SetStateInterface<UserComposition>;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const getUserDataFromLocalStorage = async () => {
    const cookie = await AsyncStorage.getItem(ASYNC_STORAGE_COOKIE_KEY);
    const stringUser = await AsyncStorage.getItem(USER_ASYNC_STORAGE_KEY);
    const userData: UserComposition = stringUser
      ? JSON.parse(stringUser)
      : null;
    if (cookie && userData && !user)
      baseApi
        .get<UserInterface>(baseApiRoutes.ME)
        .then((res) => {
          console.log("ME URL");
          setUser(res.data);
        })
        .catch((e) => console.log(e.response));
  };

  useEffect(() => {
    baseApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;
        // Prevent infinite loops
        if (
          error?.response?.status === 401 &&
          originalRequest?.url === baseApiRoutes.REFRESH
        ) {
          setUser(null);
          return Promise.reject(error);
        }
        if (error?.response?.status === 401) {
          const tokens = await AsyncStorage.getItem(ASYNC_STORAGE_COOKIE_KEY);

          if (tokens) {
            return baseApi
              .put<UserInterface>(baseApiRoutes.REFRESH)
              .then((res) => {
                setTokenAndCredentialsOnAsyncStorage(res);
                setUser(res.data);
                return axios(originalRequest);
              })
              .catch((err) => {
                console.log(err.response, "REFRESHerror");
              });
          } else {
            console.log("Refresh token is expired");
            setUser(null);
          }
        } else {
          console.log("Refresh token not available.");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    getUserDataFromLocalStorage();
  }, []);

  const logoutUser = useCallback(async () => {
    baseApi.delete(baseApiRoutes.LOGOUT);
    await AsyncStorage.removeItem(ASYNC_STORAGE_COOKIE_KEY);
    setUser(null);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const { setUser, user, logoutUser } = useContext(UserContext);
  const userIsTeacher = user?.type === UserType.T;
  const userIsChild = user?.type === UserType.C;
  const userIsResponsable = user?.type === UserType.R;

  return {
    user,
    setUser,
    userIsChild,
    userIsResponsable,
    userIsTeacher,
    logoutUser,
  };
}
