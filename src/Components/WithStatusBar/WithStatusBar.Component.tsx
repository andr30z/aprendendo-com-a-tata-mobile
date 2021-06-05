import React from "react";
import { StatusBar, Platform, View } from "react-native";

const StatusView: React.FC = () => (
  <View
    style={{
      height: Platform.OS === "ios" ? 20 + 1 : StatusBar.currentHeight,
    }}
  />
);

/**
 * High-order component that involves a certain page and gives it a margin to be spaced from the status bar, respecting the current OS
 * @param Component a React Component thats going to be wrapped
 * @param hasChildren a boolean that says if the ```Component``` wrapped makes use of children prop, this can be useful if you have a component that needs to have
 * the status bar margin into itself for layout purposes
 * @returns a React functional component with the space needed from the status bar;
 * @author andr3z0
 **/
function WithStatusBar<T>(
  Component: React.ComponentType<T>,
  hasChildren = false
) {
  return (props: T) => {
    return !hasChildren ? (
      <>
        <StatusView />
        <Component {...props} />
      </>
    ) : (
      <Component {...props}>
        <StatusView />
      </Component>
    );
  };
}

export default WithStatusBar;
