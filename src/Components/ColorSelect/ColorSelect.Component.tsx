import { MotiView } from "@motify/components";
import { useAnimationState } from "@motify/core";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean } from "../../Hooks";
import Badge from "../Badge/Badge.Component";
import {
  ColorIcon,
  ColorIconContainer,
  styles,
  TouchableColor,
  TouchableHeader,
} from "./Styles";
interface ColorSelectProps {
  color: string;
  label: string;
  onPress: (color: string) => void;
  colorsToSelect?: Array<string>;
  containerStyles?: StyleProp<ViewStyle>;
}

export const defaultColorSelectItems = [
  "#fff",
  "#83CAF6",
  "#000",
  "#9188E5",
  "#F48C7F",
  "#3C8F7C",
  "#FF4C4C",
  "#355389",
  "#ffff00",
  "#143d59",
  "#210070",
  "#213970",
  "#ffe042",
  "#e71989",
  "#ffa781",
  "#5b0e2d",
  "#f49f1c",
  "#0e387a",
  "#9fafca",
  "#efc8b1",
  "#514644",
  "#ffb8b1",
  "#993441",
];

/**
 * Color select component.
 * @author andr3z0
 **/
const ColorSelect: React.FC<ColorSelectProps> = ({
  label,
  color,
  colorsToSelect,
  onPress,
  containerStyles,
}) => {
  const toggleAnimationState = useAnimationState({
    open: {
      minHeight: 300,
    },
    from: {
      height: 30,
      minHeight: 30,
    },
    closed: {
      height: 30,
      minHeight: 30,
    },
  });

  const { value: isOpen, setValue } = useBoolean(false);

  const colors = colorsToSelect || defaultColorSelectItems;
  const toggleAnimation = (pos: string) => () => {
    setValue(pos === "open");
    const position = pos === "from" || pos === "closed" ? "closed" : "open";
    toggleAnimationState.transitionTo(position as any);
  };
  const props = {
    size: 34,
    color: color === "#fff" ? "black" : color,
  };

  return (
    <MotiView
      style={[styles.motiView, containerStyles]}
      state={toggleAnimationState}
    >
      <TouchableHeader activeOpacity={0.8}>
        <BaseContainer
          flex={1}
          align="center"
          flexDirection="row"
          justify="space-between"
        >
          <Badge
            extraContainerStyles={{ padding: 10 }}
            backgroundColor={color === "#fff" ? "#000" : color}
            pill
            shouldLimitSize={false}
            text={label}
            textAlign="center"
          />
          {!isOpen ? (
            <ColorIconContainer onPress={toggleAnimation("open")}>
              <ColorIcon name="chevron-down" {...props} />
            </ColorIconContainer>
          ) : (
            <ColorIconContainer onPress={toggleAnimation("closed")}>
              <ColorIcon name="chevron-up" {...props} />
            </ColorIconContainer>
          )}
        </BaseContainer>
      </TouchableHeader>
      <BaseContainer
        flexDirection="row"
        flexWrap="wrap"
        align="center"
        justify="space-evenly"
        width="100%"
        marginTop="20px"
        style={{ minHeight: 50 }}
      >
        {colors.map((c) => (
          <TouchableColor
            key={c}
            height={80}
            width={80}
            backgroundColor={c}
            onPress={() => onPress(c)}
            activeOpacity={0.3}
          />
        ))}
      </BaseContainer>
    </MotiView>
  );
};

export default ColorSelect;
