import React from "react";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { IconProps } from "../../Routes/Interfaces";


/**
* High Order Component that wraps a navigation icon inside a base stylization model (i.e. it will apply some styles to an icon container)
* @param Component A React Component to be wrapped.
* @author andr3z0
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
          width: focused ? 50 : 27,
        }}
        backgroundColor={focused ? "#8078cc" : "#fff"}
        align="center"
        justify="center"
      >
        <Component {...props} focused={focused} />
      </BaseContainer>
    );
  };
}

export default WithIconContainer;
