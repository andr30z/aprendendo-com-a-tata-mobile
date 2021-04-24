import styled from "styled-components/native";

export interface PageContainerInterface {
  backgroundColor?: string;
  align?: string;
  justify?: string;
  flex?: number;
  flexDirection?: string;
}

const align = ({
  justify,
  align,
  flex,
  flexDirection,
}: PageContainerInterface) => {
  let centeringStyles = {
    "align-items": "",
    "justify-content": "",
    "flex-direction": "",
    flex: 1,
  };
  if (!align && !justify) return;

  if (align) centeringStyles["align-items"] = align;

  if (justify) centeringStyles["justify-content"] = justify;

  if (flexDirection) centeringStyles["flex-direction"] = flexDirection;

  if (flex !== undefined) {
    centeringStyles["flex"] = flex;
  }
  return centeringStyles;
};

export const BaseContainer = styled.View<PageContainerInterface>`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  ${align};
`;

export const ScrollContainer = styled.ScrollView<PageContainerInterface>`
  ${align}
`;
