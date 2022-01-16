import React from "react";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { IconProps } from "../../Routes/Interfaces";


/**
* High Order Component that wraps a navigation icon inside a base stylization model (i.e. will apply some styles to an icon container, like making it bigger when focused)
* @param Component A React Component to be wrapped.
* @author andr30z
**/
function WithIconContainer(
  Component: React.ComponentType<IconProps>
): React.FC<IconProps> {
  return ({ focused, ...props }: IconProps) => {
    return (
      <BaseContainer
        style={{
          position: !focused ? "relative" : "absolute",
          top: !focused ? 0 : -25,
          borderRadius: focused ? 60 / 2 : 0,
          height: focused ? 50 : 27,
          width: focused ? 50 : 40,
        }}
        backgroundColor={!focused ? "transparent" : "#8078cc"}
        align="center"
        justify="center"
      >
        <Component {...props} focused={focused} />
      </BaseContainer>
    );
  };
}

export default WithIconContainer;
