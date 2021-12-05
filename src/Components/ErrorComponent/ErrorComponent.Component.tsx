import React from "react";
import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";
import { BaseText } from "../../GlobalStyles/BaseStyles";

interface ErrorComponentProps {
  error?: string;
  marginVertical?: string;
}

/**
 * Show Error component.
 * @author andr30z
 **/
const ErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  marginVertical = "3px",
}) => {
  return error ? (
    <BaseText marginVertical={marginVertical} color="red">
      {error}
    </BaseText>
  ) : null;
};

export default ErrorComponent;
