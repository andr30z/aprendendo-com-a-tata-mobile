import { TextInputProps, TextStyle, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { CommonStylesInterfaces } from "../Interfaces/index";

export interface BaseTextProps extends CommonStylesInterfaces {
  color?: string;
  fontSize?: string;
  align?: string;
  fontWeight?:
    | "bold"
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
}

export interface BaseInputProps extends TextInputProps {
  inputWidth?: number | string;
  inputHeight?: number | string;
  borderRadius?: string;
  withWrapper?: boolean;
  wrapperStyles?: ViewStyle;
  appendComponent?: React.ReactNode;
}
const marginPaddingConfig = ({
  marginLeft,
  marginBottom,
  marginRight,
  marginHorizontal,
  marginTop,
  marginVertical,
}: BaseTextProps) => {
  const styles = {
    "margin-left": marginLeft || "",
    "margin-bottom": marginBottom || "",
    "margin-right": marginRight || "",
    "margin-horizontal": marginHorizontal || "",
    "margin-top": marginTop || "",
    "margin-vertical": marginVertical || "",
  };

  return styles;
};
export const BaseText = styled.Text<BaseTextProps>`
  color: ${({ color }) => color || "#fff"};
  font-size: ${({ fontSize }) => fontSize || "15px"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  text-align: ${({ align }) => align || "auto"};
  ${marginPaddingConfig}
`;

export const BaseInput = styled.TextInput<BaseInputProps>`
  padding-left: 15px;
  border-radius: ${({ borderRadius }) => borderRadius || "15px"};
  background-color: #fff;
  width: ${({ inputWidth }) => inputWidth || "190px"};
  height: ${({ inputHeight }) => inputHeight || "13%"};
`;
