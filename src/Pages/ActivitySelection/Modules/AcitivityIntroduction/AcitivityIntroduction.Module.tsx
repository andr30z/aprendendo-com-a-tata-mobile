import React from "react";
import { View, Text } from "react-native";
import { CONSTANTS } from "../../../../Constants";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { IntroductionTitle } from "./Styles";
import IntroductionImg from "../../../../Illustrations/introduction-img.svg";


/**
* Activity module that is used to render a small introduction right before the activities
* @author andr3z0
**/
const AcitivityIntroduction: React.FC = () => {
  return (
    <BaseContainer
      style={{
        marginTop: 50,
      }}
    >
      <BaseContainer align="center" justify="center">
        <IntroductionTitle>Atividades</IntroductionTitle>
      </BaseContainer>
      <BaseContainer style={{ marginTop: 50 }}>
        <IntroductionImg height={CONSTANTS.DEVICE_HEIGHT / 2} width="100%" />
      </BaseContainer>
    </BaseContainer>
  );
};

export default AcitivityIntroduction;
