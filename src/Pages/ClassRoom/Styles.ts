import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

export const styles = StyleSheet.create({
  inputSearchAppendStyles: {
    position: "absolute",
    right: 10,
    alignSelf: "center",
    zIndex: 2,
    elevation: 2,
  },
  inputBaseStyles: { borderRadius: 10, elevation: 2, zIndex: 1 },
  inputWrapperStyles: {
    justifyContent: "center",
  },
  scrollContainerStyles: {
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 10,
    flex: 1,
  },
  innerScrollContainerStyles: { paddingBottom: '100%' },
});

export const ClassRoomBaseContainer = styled(BaseContainer)<{
  noElevation?: boolean;
}>`
  border-radius: 15px;
  elevation: ${({ noElevation }) => (noElevation ? 0 : 5)};
`;
