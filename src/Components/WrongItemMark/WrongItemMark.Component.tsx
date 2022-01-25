import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { MarkItemMarkProps } from "../../Interfaces";

/**
 *
 * @author andr3z0
 **/
const WrongItemMark: React.FC<MarkItemMarkProps> = ({
  color = "#e50000",
  size = 40,
  position,
  absolutePosition = true,
  center = false,
}) => {
  const centerRules: any = center
    ? {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
      }
    : {};
  const defaultPosition = absolutePosition
    ? { top: 0, left: 0, position: "absolute", ...position }
    : {};
  return (
    <BaseContainer style={{ zIndex: 10, ...centerRules }} {...defaultPosition}>
      <Ionicons name="close-sharp" size={size} color={color} />
    </BaseContainer>
  );
};

export default WrongItemMark;
