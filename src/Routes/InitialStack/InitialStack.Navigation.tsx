import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ActivitiesStackNavigation from "../ActivitiesStack/Activitities.Navigation";
import { WithStatusBar } from "../../Components";
import { InitialScreen, SignUp } from "../../Pages";
import { ROUTES_NAME } from "./RoutesName";
import { InitialStackParamsList, KeysOfInitialStackParamsList } from "./Interfaces";

const StackTab = createStackNavigator<InitialStackParamsList>();

const InitialWithStatusBar = WithStatusBar(InitialScreen, false);

const SignUpWithStatusBar = WithStatusBar(SignUp);

/**
 * This is the inital stack navigation container of the application.
 * @author andr3z0
 **/
const InitialStackNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <StackTab.Navigator
        initialRouteName={ROUTES_NAME.INITIAL}
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackTab.Screen
          name={ROUTES_NAME.INITIAL as any}
          component={InitialWithStatusBar}
        />
        <StackTab.Screen
          name={ROUTES_NAME.ACTIVITIES_STACK}
          component={ActivitiesStackNavigation}
        />
        <StackTab.Screen
          name={ROUTES_NAME.SIGN_UP}
          component={SignUpWithStatusBar}
        />
      </StackTab.Navigator>
    </NavigationContainer>
  );
};

export default InitialStackNavigation;
