import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

export const ItemTitle = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  /* align-items: center; */
  font-family: ShortStack_400Regular;
  text-align: center;
`;

export const ButtonContainer = styled(BaseContainer)<{
  roundedBorders: boolean;
}>`
  border-radius: ${({ roundedBorders }) => (roundedBorders ? "30px" : 0)};

  z-index: 20;
`;

export const ButtonActivityItem = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  padding-vertical: 5%;
  padding-horizontal: 20px;
`;
