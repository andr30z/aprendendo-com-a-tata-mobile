import React from "react";
import { Input } from "../../Components";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import SignUpTurtle from "../../Illustrations/signup.svg";
import { styles } from "./Styles";

/**
 * Signup page
 * @author andr3z0
 **/
const Signup = () => {
  return (
    <BaseContainer style={{ backgroundColor: "#F7EFEA" }} flex={1}>
      <BaseContainer flex={1} style={{ marginTop: 50 }}>
        <SignUpTurtle height="80%" width="100%" />
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
      </BaseContainer>
    </BaseContainer>
  );
};

export default Signup;
