import styled from "styled-components/native";

export interface PageContainerInterface {
  backgroundColor?: string;
  align?: string;
  justify?: string;
}

export const BaseContainer = styled.View<PageContainerInterface>`
  background-color: ${(props) => props.backgroundColor || "#fff"};
  flex: 1;
  ${({ justify, align }) => {
    let centeringStyles = { "align-items": "", "justify-content": "" };
    if (!align && !justify) return;
    
    if (align) {
      centeringStyles["align-items"] = align;
    }
    if (justify) {
      centeringStyles["justify-content"] = justify;
    }
    return centeringStyles;
  }};
`;

export const StyledText = styled.Text`
  color: palevioletred;
`;
