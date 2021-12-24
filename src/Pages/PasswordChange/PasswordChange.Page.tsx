import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { Button } from "react-native-ui-lib";
import { BackdropLoading, Input } from "../../Components";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean, useKeyboardHideOrShowEvent } from "../../Hooks";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";

export const PasswordChange: React.FC = () => {
  const [passwordState, setPasswordState] = useState({
    password: "",
    passwordConfirmation: "",
    oldPassword: "",
  });
  const {
    value: isLoading,
    setTrue: setTrueIsLoading,
    setFalse: setFalseIsLoading,
  } = useBoolean();
  const onSave = () => {
    if (passwordState.password.trim().length < 8)
      return Toast.show({
        type: "error",
        text2: "A senha deve ter no mínimo 8 caracteres",
      });
    if (passwordState.passwordConfirmation !== passwordState.password)
      return Toast.show({ type: "error", text2: "As senhas não são iguais!" });
    setTrueIsLoading();
    baseApi
      .patch(baseApiRoutes.USERS_PASSWORD, {
        currentPassword: passwordState.oldPassword,
        newPassword: passwordState.password,
      })
      .then((res) => {
        Toast.show({ text1: "Senha alterada com sucesso!" });
        console.log(res.data);
      })
      .catch(showError)
      .finally(setFalseIsLoading);
  };

  const onChange = (key: string) => (text: string) => {
    setPasswordState((past) => ({ ...past, [key]: text }));
  };
  const { value: keyboardIsVisible, setTrue, setFalse } = useBoolean();
  useKeyboardHideOrShowEvent({ onHide: setFalse, onShow: setTrue });
  return (
    <BaseContainer
      flex={1}
      align="center"
      style={{
        paddingBottom: keyboardIsVisible ? 230 : undefined,
      }}
      justify="center"
      flexDirection="column"
    >
      <BackdropLoading visible={isLoading} />
      <Input
        value={passwordState.oldPassword}
        inputWidth="80%"
        onChangeText={onChange("oldPassword")}
        inputHeight="50px"
        secureTextEntry
        placeholder="Senha antiga"
        style={{ marginBottom: 10 }}
      />
      <Input
        value={passwordState.password}
        inputWidth="80%"
        inputHeight="50px"
        onChangeText={onChange("password")}
        secureTextEntry
        placeholder="Nova senha"
        style={{ marginBottom: 10 }}
      />
      <Input
        secureTextEntry
        inputHeight="50px"
        onChangeText={onChange("passwordConfirmation")}
        placeholder="Confirmação da senha"
        value={passwordState.passwordConfirmation}
        inputWidth="80%"
      />
      {!keyboardIsVisible && (
        <Button
          style={{ marginTop: 30, width: "80%" }}
          backgroundColor="#9188E5"
          label="Salvar"
          onPress={onSave}
        />
      )}
    </BaseContainer>
  );
};
