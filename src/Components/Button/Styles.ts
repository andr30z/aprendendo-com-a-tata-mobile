import styled from "styled-components/native";

export interface BaseButtonProps {
  buttonWidth?: number | string;
  buttonHeight?: number | string;
  backgroundColor?: string;
  borderRadius?: string;
  hasElevation?: boolean;
}

export const BaseButton = styled.TouchableOpacity<BaseButtonProps>`
  border-radius: ${({ borderRadius }) => borderRadius || "30px"};
  width: ${({ buttonWidth }) => buttonWidth || "50%"};
  height: ${({ buttonHeight }) => buttonHeight || "13%"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#8F86E3"};
  elevation: ${({ hasElevation = true }) => (hasElevation ? 9 : 0)};
  box-shadow: ${({ hasElevation = true }) =>
    hasElevation ? "10px 5px 5px black" : "0 0 0 black"};
  padding-vertical: 10px;
  padding-horizontal: 12px;
`;
