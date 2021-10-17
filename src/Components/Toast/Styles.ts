import { StyleSheet } from "react-native";
import styled from "styled-components/native";


export const PressableChildrenContainer = styled.Pressable`
  width: 100%;
  height: 100%;
`;
export const toastStyles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: -100,
    zIndex: 1000,
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "baseline",
    justifyContent: "center",
    flexDirection:'row',
    padding: 8,
  },
});



