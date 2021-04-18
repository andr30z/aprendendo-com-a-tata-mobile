import React from "react";
import {
  View,
  Text,
  NativeTouchEvent,
  NativeSyntheticEvent,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BaseText, BaseTextProps } from "../../GlobalStyles/BaseStyles";
import { BaseButton, BaseButtonProps } from "./Styles";

interface ButtonProps {
  buttonTitle: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  textStyles?: BaseTextProps;
  containerStyles?: ViewStyle;
}
const Button: React.FC<BaseButtonProps & ButtonProps> = ({
  buttonTitle,
  onPress,
  textStyles,
  containerStyles,
  ...rest
}) => {
  return (
    <BaseButton onPress={onPress} {...(rest as any)} style={containerStyles}>
      <BaseText fontSize="20px" align="center" {...textStyles}>
        {buttonTitle}
      </BaseText>
    </BaseButton>
  );
};

export default Button;
