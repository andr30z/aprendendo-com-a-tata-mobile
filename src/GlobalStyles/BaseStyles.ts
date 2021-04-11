import { TextInputProps, TextStyle } from "react-native";
import styled from "styled-components/native";

export interface BaseTextProps {
  color?: string;
  fontSize?: string;
  align?: string;
}

export interface BaseInputProps extends TextInputProps{
  inputWidth?: number | string;
  inputHeight?: number | string;
}

export const BaseText = styled.Text<BaseTextProps>`
  color: ${({ color }) => color || "#fff"};
  font-size: ${({ fontSize }) => fontSize || "15px"};
  text-align: ${({ align }) => align || "auto"};
`;

export const BaseInput = styled.TextInput<BaseInputProps>`
  padding-left: 15px;
  border-radius: 15px;
  background-color: #fff;
  width: ${({ inputWidth }) => inputWidth || "190px"};
  height: ${({ inputHeight }) => inputHeight || "13%"};
`;
