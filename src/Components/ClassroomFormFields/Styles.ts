import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const TouchableClassContainer = styled.TouchableOpacity`
  width: 100%;
  height: 170px;
  margin-top: 10px;
`;

export const styles = StyleSheet.create({
  classNameInput: {
    marginTop: 10,
  },
  baseContainer: {
    borderRadius: 0,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  closeIcon: {
    top: 10,
    zIndex: 20,
    left: 10,
    position: "absolute",
  },
  btnSubmitContainer: {
    bottom: 10,
    zIndex: 20,
    position: "absolute",
  },
  btnSubmit: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconDelete: {
    position: "absolute",
    right: 13,
    top: 10,
    zIndex:5
  },
});
