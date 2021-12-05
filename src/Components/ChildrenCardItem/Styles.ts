import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const TouchableCard = styled(TouchableOpacity)<{
  isSelected: boolean;
  borderTheme: string;
}>`
  margin-right: 15px;
  box-shadow: 10px 5px 5px black;
  elevation: 9;
  height: 100%;
  width: 100px;
  border-radius: 10px;
  border: ${({ borderTheme = "white", isSelected = false }) =>
    !isSelected ? "none" : "1px solid " + borderTheme};
  background-color: #fff;
`;

export const ChildImage = styled.Image`
  height: 75%;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
