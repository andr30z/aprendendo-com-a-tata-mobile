import styled from "styled-components/native";

export interface BaseButtonProps {
  buttonWidth?: number | string;
  buttonHeight?: number | string;
  backgroundColor?: string;
  borderRadius?: string;
}

export const BaseButton = styled.TouchableOpacity<BaseButtonProps>`
  border-radius: ${({ borderRadius }) => borderRadius || "30px"};
  width: ${({ buttonWidth }) => buttonWidth || "50%"};
  height: ${({ buttonHeight }) => buttonHeight || "13%"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#8F86E3"};
  elevation: 5;
  padding-vertical: 10px;
  padding-horizontal: 12px;
`;
