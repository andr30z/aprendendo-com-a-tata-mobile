import { StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
export const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 0,
    backgroundColor: "transparent",
    width: "100%",
    minHeight: 120,
    alignSelf: "center",
    paddingLeft: 0,
    fontSize: 20,
  },
});

const baseAlign = css`
  align-self: center;
`;

export const ProfilePhotoWithCenterAlign = styled(ProfilePhoto)`
  ${baseAlign}
`;

export const BaseTextWithCenterAlign = styled(BaseText)`
  ${baseAlign}
`;
