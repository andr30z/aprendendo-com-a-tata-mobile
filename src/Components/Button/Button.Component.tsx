import React from "react";
import {
  NativeTouchEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from "react-native";
import { BaseText, BaseTextProps } from "../../GlobalStyles/BaseStyles";
import { BaseButton, BaseButtonProps } from "./Styles";

interface ButtonProps {
  buttonTitle?: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  textStyles?: BaseTextProps;
  containerStyles?: ViewStyle;
  disabled?: boolean;
}

/**
 * Generic button component, despite its name, this component uses TouchableHighlight instead of the a regular react-native button.
 * @param buttonTitle string that will be used inside the button .
 * @param onPress function thats going to be called whenever the button is pressed.
 * @param textStyles style object for the buttonTitle, to learn more about this prop see ```<BaseText />``` in ```src/GlobalStyles.ts```.
 * @param containerStyles style object for TouchableHighlight.
 * @author andr3z0
 **/
const Button: React.FC<BaseButtonProps & ButtonProps> = ({
  buttonTitle,
  onPress,
  textStyles,
  containerStyles,
  children,
  disabled,
  ...rest
}) => {
  return (
    <BaseButton
      onPress={onPress}
      disabled={disabled}
      {...(rest as any)}
      style={[
        containerStyles,
        {
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      {buttonTitle && (
        <BaseText fontSize="20px" align="center" {...textStyles}>
          {buttonTitle}
        </BaseText>
      )}
      {children}
    </BaseButton>
  );
};

export default Button;
