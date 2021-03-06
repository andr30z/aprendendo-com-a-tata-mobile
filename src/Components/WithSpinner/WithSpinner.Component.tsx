import React from "react";
import { ActivityIndicator } from "react-native";
interface WithSpinnerProps {
  isLoading: boolean;
  spinnerSize?: number;
  spinnerColor?: string;
}

/**
 * High Order Component that wraps the logic of hiding and showing a component based on a ```isLoading``` prop
 * @param Component A React Component to be wrapped.
 * @author andr30z
 **/
function WithSpinner<K>(
  Component: React.ComponentType<K>,
  CustomLoadingComponent?: React.ComponentType
) {
  return ({
    isLoading,
    spinnerColor = "#9188E5",
    spinnerSize = 23,
    ...props
  }: K & WithSpinnerProps) => {
    return isLoading ? (
      <>
        {CustomLoadingComponent ? (
          <CustomLoadingComponent />
        ) : (
          <ActivityIndicator size={spinnerSize} color={spinnerColor} />
        )}
      </>
    ) : (
      <Component {...(props as any)} />
    );
  };
}

export default WithSpinner;
