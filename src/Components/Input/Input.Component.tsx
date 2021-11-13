import React from "react";
import { BaseInput, BaseInputProps } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

/**
 * Base Input component
 * @author andr3z0
 **/
const Input: React.FC<BaseInputProps> = (props) => {
  const { withWrapper, wrapperStyles, appendComponent } = props;
  const defineWidthAndHeight = (inputOrHeight: string | number | undefined) => {
    return typeof inputOrHeight === "number"
      ? `${inputOrHeight}px`
      : inputOrHeight;
  };
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
        {CustomInput ? (
          CustomInput
        ) : (
          <BaseInput {...(props as any)} inputWidth="100%" inputHeight="100%" />
        )}
        {appendComponent}
      </BaseContainer>
    );
  return CustomInput ? <>{CustomInput}</> : <BaseInput {...(props as any)} />;
};

export default Input;
