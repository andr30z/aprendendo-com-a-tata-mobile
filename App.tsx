import { PortalHost, PortalProvider } from "@gorhom/portal";
import React from "react";
import { PORTAL_HOSTS } from "./src/Constants";
import { UserProvider } from "./src/Contexts";
import { InitialStackNavigation } from "./src/Routes";
import Toast, { ErrorToast } from "react-native-toast-message";

export default function App() {
  return (
    <>
      <UserProvider>
        <PortalProvider>
          <InitialStackNavigation />
          <PortalHost name={PORTAL_HOSTS.ROOT_PORTAL} />
        </PortalProvider>
      </UserProvider>
      {/* THIS SHOULD STAY HERE AS THE LAST CHILD */}
      <Toast
        config={{
          error: (props) => (
            <ErrorToast
              {...props}
              text1Style={{
                fontSize: 17,
                color: "red",
              }}
              text2NumberOfLines={3}
              style={{ minHeight: 89, borderColor: "red" }}
              text2Style={{
                fontSize: 15,
                color: "black",
              }}
            />
          ),
        }}
      />
    </>
  );
}
