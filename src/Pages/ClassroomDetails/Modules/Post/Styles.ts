import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { ProfilePhoto } from "../../../../Components";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";

const imageSize = 35;

export const ProfileImage = styled(ProfilePhoto)`
  margin-right: 9px;
`;

export const PostModuleContainer = styled(BaseContainer)`
  padding-horizontal: 5%;
`;

export const PostText = styled(BaseText)`
  padding: 5px;
  border: 0.7px solid #000;
  border-radius: 13px;
  flex: 1;
`;

export const styles = StyleSheet.create({
  badgeContainerStyles: {
    justifyContent: "center",
    flexDirection: "row",
  },
  badgeTextStyles: {
    padding: 2,
    justifyContent: "center",
    fontSize: 13,
    alignItems: "center",
  },
});
