import React from "react";
import { Linking } from "react-native";
import { Button } from "react-native-ui-lib";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

const Link: React.FC<{ link: string; label: string }> = ({ link, label }) => (
  <Button
    style={{ marginTop: 10, width: "100%" }}
    color="#2119ff"
    onPress={() => Linking.openURL(link)}
  >
    <BaseText color="#fff" fontSize="20px">
      {label}
    </BaseText>
  </Button>
);

const CreditsInfo: React.FC = () => {
  return (
    <BaseContainer flex={1}>
      <BaseText marginTop="30px" align="center" color="black" fontSize="25px">
        As imagens utilizadas no aplicativo pertencem aos seguintes:
      </BaseText>
      <BaseContainer
        flexDirection="column"
        justify="center"
        align="center"
        flex={1}
        paddingHorizontal="5%"
      >
        <Link link="https://storyset.com" label="@Storyset" />
        <Link link="https://freesvg.org/fruit-collection" label="@Free SVG" />
        <Link link="https://www.svgrepo.com" label="@SVG Repo" />
        <Link link="https://freeicons.io/iconset/free" label="@Free Icons" />
      </BaseContainer>
    </BaseContainer>
  );
};

export default CreditsInfo;
