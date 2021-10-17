import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { useUserContext } from "../../../Contexts";
import { InitialStackParamsList } from "../../../Routes/InitialStack/Interfaces";
import {
    baseApi,
    baseApiRoutes
} from "../../../Services";
import {
    setTokenAndCredentialsOnAsyncStorage,
    verifyIfStringIsEmpty
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
  const [errorToast, setErrorToast] = useState({ show: false, errorMsg: "" });
  const onChange = (key: string) => (text: string) =>
    setLoginCredentials((past) => ({ ...past, [key]: text }));

  const onSubmit = () => {
    if (
      verifyIfStringIsEmpty(loginCredentials.email) ||
      verifyIfStringIsEmpty(loginCredentials.password)
    ) {
      return setErrorToast({
        show: true,
        errorMsg: "Preencha os campos completamente!",
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
        const data = e.response.data;
        const responseStateFormat = {
          show: true,
          errorMsg: "Erro, por favor tente novamente mais tarde!",
        };
        if (data?.statusCode === 404)
          responseStateFormat["errorMsg"] = data.message;

        setErrorToast(responseStateFormat);

        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  return {
    onSubmit,
    isLoading,
    setIsLoading,
    errorToast,
    setErrorToast,
    navigation,
    onChange,
    loginCredentials,
    setLoginCredentials,
  };
}
