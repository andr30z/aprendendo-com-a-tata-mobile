import React from "react";
import { View, Text } from "react-native";
import { LabelProps } from "../../../Interfaces";

interface TextBarProps {
  textLabel: string;
}

/**
* Label Component that is responsible to render a label below the icon page on the navigation bar.
* @param textLabel the text responsible for identifying the current page
* @author andr30z
**/
const TextBar: React.FC<LabelProps & TextBarProps> = ({ textLabel }) => {
  return (
    <Text style={{ color: "#FFF", fontSize: 12, marginBottom: 8 }}>
      {textLabel}
    </Text>
  );
};

export default TextBar;
