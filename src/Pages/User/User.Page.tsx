import React, { useCallback, useMemo } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { BackdropLoading, UserForm } from "../../Components";
import { useUserContext } from "../../Contexts";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean } from "../../Hooks";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";

/**
 * User page
 * @author andr30z
 **/
const User: React.FC = () => {
  const { user, setUser } = useUserContext();
  const userInfo = useMemo(
    () => ({
      ...user,
      birthday: new Date(user?.birthday as any),
      profilePhoto: user?.profilePhoto?.path as string,
      password: "123456789",
      passwordConfirmation: "123456789",
    }),
    [user]
  );
  const { value, setTrue, setFalse } = useBoolean();
  const onSubmit = useCallback(
    (fields) => {
      console.log(fields, "FIELDSSS");
      setTrue();
      baseApi
        .put(baseApiRoutes.USERS + "/" + user?._id, fields)
        .then((res) => {
          Toast.show({
            text1: "Registro alterado com sucesso!",
            visibilityTime: 2500,
          });
          setUser(res.data);
          console.log(res.data, "AAAA");
        })
        .catch((e) => {
          showError(e);
          console.log(e.response);
        })
        .finally(setFalse);
    },
    [user]
  );
  return (
    <BaseContainer flex={1}>
      <BackdropLoading visible={value} />
      <UserForm
        customOnSubmit={onSubmit}
        color="#9188E5"
        initialValues={userInfo as any}
        showSensitiveFields={false}
        showLabels
      />
    </BaseContainer>
  );
};

export default User;
