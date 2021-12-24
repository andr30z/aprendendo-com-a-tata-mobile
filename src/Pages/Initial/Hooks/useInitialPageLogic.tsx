import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useUserContext } from "../../../Contexts";
import { InitialStackParamsList } from "../../../Routes/InitialStack/Interfaces";
import { baseApi, baseApiRoutes } from "../../../Services";
import {
  setTokenAndCredentialsOnAsyncStorage,
  showError,
  verifyIfStringIsEmpty,
} from "../../../Utils";
import { LoginResponse } from "../Interfaces";

/**
 * This hook holds all logic from InitialPage component.
 * @author andr3z0
 **/
export function useInitialPageLogic() {
  const navigation =
    useNavigation<StackNavigationProp<InitialStackParamsList>>();
  const [loginCredentials, setLoginCredentials] = useState({
    password: "",
    email: "",
  });

  const { setUser } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const onChange = (key: string) => (text: string) =>
    setLoginCredentials((past) => ({ ...past, [key]: text }));

  const onSubmit = () => {
    if (
      verifyIfStringIsEmpty(loginCredentials.email) ||
      verifyIfStringIsEmpty(loginCredentials.password)
    ) {
      return Toast.show({
        type: "error",
        text2: "Preencha os campos completamente!",
      });
    }
    setIsLoading(true);
    baseApi
      .post<LoginResponse>(baseApiRoutes.LOGIN, loginCredentials)
      .then((res) => {
        setTokenAndCredentialsOnAsyncStorage(res);
        setUser(res.data);
      })
      .catch((e) => {
        showError(e);

        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  return {
    onSubmit,
    isLoading,
    setIsLoading,
    navigation,
    onChange,
    loginCredentials,
    setLoginCredentials,
  };
}
