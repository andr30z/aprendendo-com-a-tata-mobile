import React from "react";
import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
import { BaseText } from "../../GlobalStyles/BaseStyles";

interface ErrorComponentProps {
  error?: string;
}

/**
 * Show Error component.
 * @author andr30z
 **/
const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return error ? <BaseText color="red">{error}</BaseText> : null;
};

export default ErrorComponent;
