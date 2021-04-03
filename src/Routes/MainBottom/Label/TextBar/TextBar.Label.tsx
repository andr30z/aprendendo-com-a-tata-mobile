import React from "react";
import { View, Text } from "react-native";
import { LabelProps } from "../../../Interfaces";

interface TextBarProps {
  textLabel: string;
}

const TextBar: React.FC<LabelProps & TextBarProps> = ({ textLabel }) => {
  return (
    <Text style={{ color: "#000", fontSize: 12, marginBottom: 5 }}>
      {textLabel}
    </Text>
  );
};

export default TextBar;
