import { FlexAlignType } from "react-native";
import styled from "styled-components/native";
import { CommonStylesInterfaces } from "../Interfaces/index";
export interface PageContainerInterface extends CommonStylesInterfaces {
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
  flexDirection?: "column" | "column-reverse" | "row" | "row-reverse";
  borderRadius?: string | undefined;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  boxShadow?: string;
  position?: "absolute" | "relative";
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
  left?: number | string;
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

const marginPaddingConfig = ({
  marginLeft,
  marginBottom,
  marginRight,
  marginHorizontal,
  marginTop,
  marginVertical,
  paddingHorizontal,
  paddingVertical,
}: PageContainerInterface) => {
  const styles = {
    "margin-left": marginLeft || "",
    "margin-bottom": marginBottom || "",
    "margin-right": marginRight || "",
    "margin-horizontal": marginHorizontal || "",
    "margin-top": marginTop || "",
    "margin-vertical": marginVertical || "",
    "padding-horizontal": paddingHorizontal || "",
    "padding-vertical": paddingVertical || "",
  };

  return styles;
};

const positionAbsoluteAlign = ({
  top,
  bottom,
  right,
  left,
  position
}: PageContainerInterface) => {
  return {
    top,
    bottom,
    right,
    left,
    position
  };
};

export const BaseContainer = styled.View<PageContainerInterface>`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  ${(props) => {
    return {
      "flex-wrap": props.flexWrap,
    };
  }};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  border-radius: ${(props) => props.borderRadius || 0};
  ${marginPaddingConfig}
  box-shadow: ${(props) => props.boxShadow || "none"};
  ${align};
  ${positionAbsoluteAlign}
`;

export const ScrollContainer = styled.ScrollView<PageContainerInterface>`
  ${align}
`;
