import styled from "styled-components/native";

export interface BadgeProps {
  backgroundColor?: string;
  pill?: boolean;
}

export const BadgeContainer = styled.View<BadgeProps>`
  background: ${(props) => props.backgroundColor || "#fff"}
  border-radius:  ${(props) => (props.pill ? "6px" : "0")}
  padding: 1.3%;
`;
