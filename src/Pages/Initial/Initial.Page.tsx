import React from "react";
import { Pressable, StatusBar, View } from "react-native";
import { Button, CloudsContainer, Input, Toast } from "../../Components";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import BottomImage from "../../Illustrations/turtleimg.svg";
import { ROUTES_NAME } from "../../Routes/InitialStack/RoutesName";
import { useInitialPageLogic } from "./Hooks";

/**
 * When the user lauches the app, if he is unauthenticated, thats the screen he's going to see first
 * @author andr3z0
 **/
const Initial: React.FC = () => {
  const {
    errorToast,
    navigation,
    onChange,
    onSubmit,
    setErrorToast,
    loginCredentials,
  } = useInitialPageLogic();
  return (
    <>
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
            style={{ fontSize: 18 }}
            value={loginCredentials.email}
            onChangeText={onChange("email")}
            autoCapitalize="none"
          />
          <Input
            inputWidth="100%"
            style={{ marginTop: 15, fontSize: 18 }}
            placeholder="Senha"
            borderRadius="30px"
            autoCapitalize="none"
            value={loginCredentials.password}
            onChangeText={onChange("password")}
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
            }}
            backgroundColor="#f7cc7f"
            buttonTitle="Entrar"
            onPress={onSubmit}
            buttonWidth="100%"
          />
          <Button
            containerStyles={{ marginTop: 15 }}
            backgroundColor="#fff"
            textStyles={{
              color: "#f7cc7f",
              fontSize: "18px",
            }}
            buttonTitle="Cadastrar"
            onPress={() => navigation.navigate(ROUTES_NAME.SIGN_UP)}
            buttonWidth="100%"
          />
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
