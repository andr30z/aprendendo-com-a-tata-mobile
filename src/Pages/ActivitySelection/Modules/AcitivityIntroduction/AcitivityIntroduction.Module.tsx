import React from "react";
import { useWindowDimensions } from "react-native";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import IntroductionImg from "../../../../Illustrations/introduction-img.svg";
import { IntroductionTitle } from "./Styles";

/**
 * Activity module that is used to render a small introduction right before the activities
 * @author andr30z
 **/
const AcitivityIntroduction: React.FC = () => {
  const { height } = useWindowDimensions();
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
        <IntroductionImg height={height / 2} width="100%" />
      </BaseContainer>
    </BaseContainer>
  );
};

export default AcitivityIntroduction;
