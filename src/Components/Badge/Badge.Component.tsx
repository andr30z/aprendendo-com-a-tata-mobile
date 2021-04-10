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
  text: string;
  textColor?: string;
  textAlign?: string;
  extraTextStyles?: TextStyle;
  extraContainerStyles?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}
const Badge: React.FC<BadgeProps & BadgeComponentProps> = ({
  backgroundColor,
  text,
  textColor,
  textAlign = "center",
  pill,
  extraTextStyles,
  extraContainerStyles,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <BadgeContainer
        style={extraContainerStyles as any}
        backgroundColor={backgroundColor}
        pill={pill === undefined ? false : pill}
      >
        <Text
          style={
            {
              fontSize: 10,
              color: textColor || "#000",
              textAlign,
              ...extraTextStyles,
            } as any
          }
        >
          {text}
        </Text>
      </BadgeContainer>
    </Pressable>
  );
};

export default Badge;
