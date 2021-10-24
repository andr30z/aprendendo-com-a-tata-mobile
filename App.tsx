import { PortalHost, PortalProvider } from "@gorhom/portal";
import React from "react";
import { PORTAL_HOSTS } from "./src/Constants";
import { UserProvider } from "./src/Contexts";
import { InitialStackNavigation } from "./src/Routes";
export default function App() {
  return (
    <UserProvider>
      <PortalProvider>
        <InitialStackNavigation />
        <PortalHost name={PORTAL_HOSTS.ROOT_PORTAL} />
      </PortalProvider>
    </UserProvider>
  );
}
