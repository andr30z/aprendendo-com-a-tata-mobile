import React from "react";
import Input from "../../../../Components/Input/Input.Component";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import Icons from "../../../../Illustrations/kids.svg";


/**
* Activity Module that represents a header.
* @author andr30z
**/
const ActivityHeader: React.FC = () => {
  return (
    <BaseContainer align="center">
      <BaseContainer
        flex={0.5}
        justify="center"
        align="center"
        style={{
          width: "100%",
        }}
      >
        <BaseText color="#fff" align="center" fontSize="20px">
          Descubra Atividades
        </BaseText>
        <BaseText
          color="#8078cc"
          align="center"
          fontSize="24px"
          style={{
            marginTop: 7,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 25,
          }}
        >
          Explore Novos Tópicos
        </BaseText>
      </BaseContainer>
      <BaseContainer
        justify="center"
        align="center"
        style={{
          width: "100%",
          paddingHorizontal: 8,
        }}
      >
        <Icons width="100%" height="80%" color="#fff" />
      </BaseContainer>
      <BaseContainer justify="flex-start" align="center" flex={0.5}>
        <Input
          placeholder="Procure por atividades"
          inputWidth="300px"
          inputHeight="56px"
          style={{ marginTop: 20 }}
        />
      </BaseContainer>
    </BaseContainer>
  );
};

export default ActivityHeader;
