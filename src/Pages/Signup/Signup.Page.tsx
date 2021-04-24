import React from "react";
import { Button, CloudsContainer, Input } from "../../Components";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import SignUpTurtle from "../../Illustrations/signup.svg";
import { styles } from "./Styles";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ROUTES_NAME } from "../../Routes/InitialStack/RoutesName";

/**
 * Signup page
 * @author andr3z0
 **/
const Signup = () => {
  const navigation = useNavigation();
  return (
    <BaseContainer
      style={{ backgroundColor: "#FFC2C1", position: "relative" }}
      flex={1}
    >
      <StatusBar backgroundColor="#B24846" />
      <CloudsContainer />
      <BaseContainer flex={1} style={{ marginTop: 30 }}>
        <BaseText
          align="center"
          fontSize="20px"
          color="#fff"
          style={{ marginBottom: 15 }}
        >
          Cadastro de Usuário
        </BaseText>
        <SignUpTurtle height="70%" width="100%" />
      </BaseContainer>
      <BaseContainer
        flex={2}
        align="center"
        flexDirection="column"
        justify="flex-start"
      >
        <Input
          inputWidth="80%"
          placeholder="Nome"
          style={styles.commonStyles}
        />
        <Input
          inputWidth="80%"
          placeholder="Nome de Usuário"
          style={styles.commonStyles}
        />
        <Input
          inputWidth="80%"
          placeholder="Email"
          style={styles.commonStyles}
        />
        <Input inputWidth="80%" placeholder="Senha" secureTextEntry />
        <Button
          buttonTitle="Cadastrar"
          buttonWidth="80%"
          containerStyles={{ justifyContent: "center", marginTop: 15 }}
          buttonHeight="13%"
          backgroundColor="#FF6765"
          onPress={() => null}
        />
        <Pressable
          style={{ width: "80%", marginTop: 30 }}
          onPress={() => navigation.navigate(ROUTES_NAME.INITIAL)}
        >
          <BaseText align="left" color="#fff" fontSize="17px">
            Já tenho conta
          </BaseText>
        </Pressable>
      </BaseContainer>
    </BaseContainer>
  );
};

export default Signup;
