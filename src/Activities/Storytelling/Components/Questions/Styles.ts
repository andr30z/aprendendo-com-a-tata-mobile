import styled from "styled-components/native";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
interface CloseIconContainer {
  isScrolling: boolean;
}
export const CloseIconContainer = styled(BaseContainer)<CloseIconContainer>`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  opacity: ${(props) => (props.isScrolling ? .1 : 1)};
`;
