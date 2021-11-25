import React from "react";
import {
  View,
  Text,
  TextStyle,
  ViewStyle,
  StyleProp,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { BadgeContainer, BadgeProps } from "./Styles";

interface BadgeComponentProps {
  text?: string;
  textColor?: string;
  textAlign?: string;
  extraTextStyles?: TextStyle;
  extraContainerStyles?: ViewStyle;
  shouldLimitSize?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * Badge component, its possible to use this as pressable item, since it uses the <Pressable/> component
 * @param backgroundColor string that represents the background color of the badge, use hex or literal names of colors here, DON'T USE rgba colors, it will not work
 * @param text optional string that will be rendered inside the badge;
 * @param textColor string that represent the color of the text;
 * @param textAlign string that indicates the text align, it defaults to "center"
 * @param pill boolean that indicates if the badge should have a rounded format, default value is ```true```
 * @param extraTextStyles ````TextStyle```` that will be passed to the ````<Text />```` component
 * @param extraContainerStyles ````ViewStyle```` that will be passed to the ````<BadgeContainer/>````
 * @param onPress void function that will be used in case you need the badge to be a pressable item;
 * @param shouldLimitSize optional boolean that tells when this component should limit the container size, default value is ```true```;
 * @param children react default children that will be rendered inside the ````<Text />```` tag. Be careful when placiong elements here, they can break the component layout.
 * @author andr3z0
 **/
const Badge: React.FC<BadgeProps & BadgeComponentProps> = ({
  backgroundColor,
  text,
  textColor,
  textAlign = "center",
  pill,
  extraTextStyles,
  extraContainerStyles,
  onPress,
  shouldLimitSize = true,
  children,
}) => {
  return (
    <Pressable onPress={onPress}>
      <BadgeContainer
        shouldLimitSize={shouldLimitSize}
        style={extraContainerStyles as any}
        backgroundColor={backgroundColor}
        pill={pill === undefined ? false : pill}
      >
        <Text
          style={
            {
              fontSize: 10,
              color: textColor || "#fff",
              textAlign: textAlign || "center",
              ...extraTextStyles,
            } as any
          }
          ellipsizeMode="tail"
          numberOfLines={shouldLimitSize ? 1 : undefined}
        >
          {text}
          {children}
        </Text>
      </BadgeContainer>
    </Pressable>
  );
};

export default Badge;
