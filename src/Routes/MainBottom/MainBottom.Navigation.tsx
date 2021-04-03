import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivitySelection, Settings, User } from "../../Pages";

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
      <BottomTab.Navigator>
        <BottomTab.Screen
          name={ROUTES_NAME.HOME}
          component={ActivitySelection}
        />
        <BottomTab.Screen name={ROUTES_NAME.SETTINGS} component={Settings} />
        <BottomTab.Screen name={ROUTES_NAME.USER} component={User} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default MainBottomNavigation;
