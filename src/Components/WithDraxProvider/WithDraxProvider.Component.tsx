import React from "react";
import { DraxProvider } from "react-native-drax";
/**
 * HOC that wrap a component inside de Drax Provider context.
 * @author andr3z0
 **/
export default function WithDraxProvider<P>(Component: React.ComponentType<P>) {
  return (props: P) => (
    <DraxProvider>
      <Component {...props} />
    </DraxProvider>
  );
}
