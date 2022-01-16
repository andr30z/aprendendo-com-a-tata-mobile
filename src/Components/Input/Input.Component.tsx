import React from "react";
import ErrorComponent from "../ErrorComponent/ErrorComponent.Component";
import {
  BaseInput,
  BaseInputProps,
  BaseText,
} from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

/**
 * Base Input component
 * @author andr30z
 **/
const Input: React.FC<BaseInputProps> = (props) => {
  const { withWrapper, wrapperStyles, appendComponent, error } = props;
  const defineWidthAndHeight = (inputOrHeight: string | number | undefined) => {
    return typeof inputOrHeight === "number"
      ? `${inputOrHeight}px`
      : inputOrHeight;
  };
  const label = props.label;
  const CustomInput = props.customComponent;
  if (withWrapper)
    return (
      <BaseContainer
        width={defineWidthAndHeight(props.inputWidth)}
        height={defineWidthAndHeight(props.inputHeight)}
        style={[
          {
            position: "relative",
          },
          wrapperStyles,
        ]}
      >
        {label && <BaseText marginLeft="7px" marginBottom="0" color="black">{label}</BaseText>}
        {CustomInput ? (
          CustomInput
        ) : (
          <BaseInput
            {...(props as any)}
            inputWidth="100%"
            inputHeight="100%"
            ref={props.inputRef}
          />
        )}
        {appendComponent}
        <ErrorComponent error={error} />
      </BaseContainer>
    );
  return CustomInput ? (
    <>{CustomInput}</>
  ) : (
    <BaseInput {...(props as any)} ref={props.inputRef} />
  );
};

export default Input;
