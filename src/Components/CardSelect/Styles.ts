import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const CardItem = styled(TouchableOpacity)`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  position: relative;
  elevation: 2;
  background-color: white;
  margin-horizontal: 8px;
  margin-vertical: 5px;
  box-shadow: 5px 5px 5px black;
`;
