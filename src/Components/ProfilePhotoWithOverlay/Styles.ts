import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Overlay = styled.View`
  height: 35%;
  z-index: 2;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #000;
  opacity: 0.4;
  align-items: center;
  justify-content: center;
`;

export const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20
  },
  icon: {
    flex: 1
  },
  profile: {
    borderRadius: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
  },
});
