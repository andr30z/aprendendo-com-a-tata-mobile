import { Ionicons } from "@expo/vector-icons";
import React from "react";
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
}) => {
  const defaultPosition = { top: 0, left: 0, ...position };
  return (
    <BaseContainer
      style={{ zIndex: 10 }}
      position={absolutePosition ? "absolute" : undefined}
      {...defaultPosition}
    >
      <Ionicons name="close-sharp" size={size} color={color} />
    </BaseContainer>
  );
};

export default WrongItemMark;
