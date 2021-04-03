import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivitySelection, Settings, User } from "../../Pages";
import { Home } from "./Icons";

const BottomTab = createBottomTabNavigator();

export const ROUTES_NAME = {
  HOME: "ActivitySelection",
  SETTINGS: "Settings",
  USER: "User",
};

/**
 * This is the main navigation container of the application.
 * @author andr3z0
 **/
const MainBottomNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName={ROUTES_NAME.HOME}>
        <BottomTab.Screen name={ROUTES_NAME.SETTINGS} component={Settings} />
        <BottomTab.Screen
          options={{
            tabBarIcon: Home,
            title: "",
          }}
          name={ROUTES_NAME.HOME}
          component={ActivitySelection}
        />
        <BottomTab.Screen name={ROUTES_NAME.USER} component={User} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default MainBottomNavigation;
