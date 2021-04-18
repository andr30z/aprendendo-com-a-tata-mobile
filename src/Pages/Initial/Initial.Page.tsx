import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable, StatusBar, View } from "react-native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ROUTES_NAME } from "../../Routes/InitialStack/RoutesName";
import BottomImage from "../../Illustrations/turtleimg.svg";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { Input, Button } from "../../Components";
import { CloudsContainer } from "./Modules";

/**
 * When the user lauches the app, if he is unauthenticated, thats the screen he's going to see first
 * @author andr3z0
 **/
const Initial: React.FC = ({ children }) => {
  const navigation = useNavigation();
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
          <BaseText>AAA</BaseText>
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
            placeholder="Nome de usuário"
            borderRadius="30px"
          />
          <Input
            inputWidth="100%"
            style={{ marginTop: 15 }}
            placeholder="Senha"
            borderRadius="30px"
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
            containerStyles={{ marginTop: 10 }}
            backgroundColor="#f7cc7f"
            buttonTitle="Entrar"
            onPress={() => null}
            buttonWidth="100%"
          />
          <BaseContainer style={{ marginTop: 10 }} flexDirection="row">
            <Button
              backgroundColor="#fff"
              buttonTitle="Convidado"
              onPress={() => navigation.navigate(ROUTES_NAME.APP_CONTENT)}
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
