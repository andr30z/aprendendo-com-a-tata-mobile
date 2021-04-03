import React from "react";
import { StatusBar, Platform, View } from "react-native";

/**
* High-order component that involves a certain page and gives it a certain margin to be spaced from the status bar, respecting the current OS
* @param Component a React Component thats going to be wrapped 
* @returns a React functional component with the space needed from the status bar;
* @author andr3z0
**/
function WithStatusBar<T>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <>
      <View
        style={{
          height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
        }}
      />
      <Component {...props} />
    </>
  );
}

export default WithStatusBar;
