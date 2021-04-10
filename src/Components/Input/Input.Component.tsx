import React, { useMemo } from "react";
import { TextInputProps } from "react-native";
import { BaseInput, BaseInputProps } from "../../GlobalStyles/BaseStyles";

const Input: React.FC<BaseInputProps> = (props) => {
  return <BaseInput {...props as any} />;
};

export default Input;
