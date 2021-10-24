import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { WithStatusBar } from "../../Components";
import { useUserContext } from "../../Contexts";
import { InitialScreen, SignUp } from "../../Pages";
import MainStackNavigation from "../MainStackNavigation/MainStackNavigation.Navigation";
import { InitialStackParamsList } from "./Interfaces";
import { ROUTES_NAME } from "./RoutesName";

const StackTab = createStackNavigator<InitialStackParamsList>();

const InitialWithStatusBar = WithStatusBar(InitialScreen, false);

const SignUpWithStatusBar = WithStatusBar(SignUp);

/**
 * This is the inital stack navigation container of the application.
 * @author andr3z0
 **/
const InitialStackNavigation: React.FC = () => {
  const { user } = useUserContext();
  return (
    <NavigationContainer>
      <StackTab.Navigator
        initialRouteName={ROUTES_NAME.INITIAL}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <StackTab.Group>
            <StackTab.Screen
              name={ROUTES_NAME.INITIAL}
              component={InitialWithStatusBar}
            />
            <StackTab.Screen
              name={ROUTES_NAME.SIGN_UP}
              component={SignUpWithStatusBar}
            />
          </StackTab.Group>
        ) : (
          <StackTab.Screen
            name={ROUTES_NAME.MAIN_STACK}
            component={MainStackNavigation}
          />
        )}
      </StackTab.Navigator>
    </NavigationContainer>
  );
};

export default InitialStackNavigation;
