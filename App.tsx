import { PortalHost, PortalProvider } from "@gorhom/portal";
import React, { useEffect } from "react";
import { PORTAL_HOSTS } from "./src/Constants";
import { UserProvider } from "./src/Contexts";
import { InitialStackNavigation } from "./src/Routes";
import Toast, { ErrorToast } from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  ShortStack_400Regular,
} from "@expo-google-fonts/short-stack";
SplashScreen.preventAutoHideAsync().catch(console.warn);
export default function App() {
  const [fontsLoaded] = useFonts({ ShortStack_400Regular });
  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;
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
