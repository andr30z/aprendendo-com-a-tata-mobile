import { LinearGradient } from "expo-linear-gradient";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const ButtonActivity = styled(RectButton)`
  padding: 5px;
  height: 45px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const LinearGradientButtonContainer = styled(LinearGradient)`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 5px;
`;
