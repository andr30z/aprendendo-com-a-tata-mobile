import styled from "styled-components/native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

export const DraggableText = styled(BaseContainer)<{
  viewMarginLeft?: boolean;
}>`
  height: 70px;
  width: 70px;
  margin-left: ${({ viewMarginLeft }) => (viewMarginLeft ? "10px" : "0")};
  justify-content: center;
  borderRadius: 25px;
`;
