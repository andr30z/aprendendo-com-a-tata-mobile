import React from "react";
import { StatusBar, Platform, View } from "react-native";
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
