import styled from "styled-components/native";

export interface BaseText {
  color?: string;
  fontSize?: string;
  align?: string;
}

export const BaseText = styled.Text<BaseText>`
  color: ${({ color }) => color || "#000"};
  font-size: ${({ fontSize }) => fontSize || "15px"};
  text-align: ${({ align }) => align || "auto"};
`;
