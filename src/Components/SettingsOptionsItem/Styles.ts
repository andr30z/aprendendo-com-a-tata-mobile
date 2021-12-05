import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const TouchableSettingsItemContainer = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  margin-top: 10px;
  padding-left: 4%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const styles = StyleSheet.create({
  touchable: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
