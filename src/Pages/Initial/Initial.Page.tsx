import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StatusBar,
  TextInputChangeEventData,
  View,
} from "react-native";
import { Button, CloudsContainer, Input, Toast } from "../../Components";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import BottomImage from "../../Illustrations/turtleimg.svg";
import { InitialStackParamsList } from "../../Routes/InitialStack/Interfaces";
import { ROUTES_NAME } from "../../Routes/InitialStack/RoutesName";
import { baseApi, baseApiRoutes } from "../../Services";
import { verifyIfStringIsEmpty } from "../../Utils";
import { LoginResponse } from "./Interfaces";

/**
 * When the user lauches the app, if he is unauthenticated, thats the screen he's going to see first
 * @author andr3z0
 **/
const Initial: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<InitialStackParamsList>>();
  const [loginCredentials, setLoginCredentials] = useState({
    password: "",
    email: "",
  });
  const [showErrorToast, setShowErrorToast] = useState(false);
  const onChange =
    (key: string) => (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
      setLoginCredentials((past) => ({ ...past, [key]: e.nativeEvent.text }));

  const onSubmit = () => {
    if (
      verifyIfStringIsEmpty(loginCredentials.email) ||
      verifyIfStringIsEmpty(loginCredentials.password)
    )
      return;
    baseApi
      .post<LoginResponse>(baseApiRoutes.LOGIN, loginCredentials)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Toast show={showErrorToast} setShow={setShowErrorToast}>
        <BaseText>Verifique as credenciais informadas.</BaseText>
      </Toast>
      <BaseContainer
        flexDirection="column"
        style={{ backgroundColor: "#F7EFEA", flex: 1, position: "relative" }}
      >
        <StatusBar backgroundColor="#ded7d2" translucent />
        <CloudsContainer />
        <BaseContainer
          flex={2}
          align="center"
          justify="center"
          flexDirection="column"
          style={{ marginTop: 25 }}
        >
          <BaseText fontSize="25px" color="black">
            Aprendendo com a Tatá
          </BaseText>
        </BaseContainer>
        <BaseContainer
          flex={4}
          align="center"
          justify="center"
          flexDirection="column"
          style={{
            paddingHorizontal: "10%",
          }}
        >
          <Input
            inputWidth="100%"
            placeholder="Email"
            borderRadius="30px"
            value={loginCredentials.email}
            onChange={onChange("email")}
          />
          <Input
            inputWidth="100%"
            style={{ marginTop: 15 }}
            placeholder="Senha"
            borderRadius="30px"
            value={loginCredentials.password}
            onChange={onChange("password")}
            secureTextEntry
          />
          <Pressable
            onPress={() => null}
            style={{
              width: "100%",
              marginVertical: 10,
              marginRight: 7,
            }}
          >
            <BaseText color="#f7cc7f" align="right">
              Esqueci minha senha
            </BaseText>
          </Pressable>
          <Button
            containerStyles={{
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            backgroundColor="#f7cc7f"
            buttonTitle="Entrar"
            onPress={() => null}
            buttonWidth="100%"
          />
          <BaseContainer marginTop="10px" flexDirection="row">
            <Button
              backgroundColor="#fff"
              buttonTitle="Convidado"
              onPress={() => navigation.navigate(ROUTES_NAME.ACTIVITIES_STACK)}
              buttonWidth="49%"
              buttonHeight="100%"
              textStyles={{
                fontSize: "18px",
                color: "#8F86E3",
              }}
            />
            <Button
              containerStyles={{ marginLeft: 5 }}
              backgroundColor="#fff"
              textStyles={{
                color: "#f7cc7f",
                fontSize: "18px",
              }}
              buttonTitle="Cadastrar"
              onPress={() => navigation.navigate(ROUTES_NAME.SIGN_UP)}
              buttonWidth="49%"
              buttonHeight="100%"
            />
          </BaseContainer>
        </BaseContainer>
        <BaseContainer
          flex={2}
          style={{ marginBottom: 7, position: "relative" }}
          justify="flex-end"
        >
          <BottomImage
            height="80%"
            style={{ zIndex: 5, alignSelf: "center" }}
          />
          <View
            style={{
              backgroundColor: "#72BFC7",
              width: "100%",
              height: "30%",
              position: "absolute",
              bottom: 0,
              marginBottom: -10,
            }}
          />
        </BaseContainer>
      </BaseContainer>
    </>
  );
};

export default Initial;
