import React from "react";
import { UserProvider } from "./src/Contexts";
import { InitialStackNavigation } from "./src/Routes";

export default function App() {
  return (
    <UserProvider>
      <InitialStackNavigation />
    </UserProvider>
  );
}
