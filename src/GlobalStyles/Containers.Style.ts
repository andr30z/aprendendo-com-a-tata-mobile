import { FlexAlignType } from "react-native";
import styled from "styled-components/native";
export interface PageContainerInterface {
  backgroundColor?: string;
  align?: FlexAlignType;
  justify?:
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "center"
    | "flex-end"
    | "flex-start"
    | undefined;
  flex?: number;
  flexDirection?: string;
  borderRadius?: string | undefined;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  marginVertical?: string | undefined;
  marginHorizontal?: string | undefined;
  paddingVertical?: string | undefined;
  paddingHorizontal?: string | undefined;
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
  ${(props) => {
    return {
      "flex-wrap": props.flexWrap,
    };
  }};
  border-radius: ${(props) => props.borderRadius || 0};
  margin-vertical: ${(props) => props.marginVertical || 0};
  margin-horizontal: ${(props) => props.marginHorizontal || 0};
  padding-vertical: ${(props) => props.paddingVertical || 0};
  padding-horizontal: ${(props) => props.paddingHorizontal || 0};
  ${align};
`;

export const ScrollContainer = styled.ScrollView<PageContainerInterface>`
  ${align}
`;
