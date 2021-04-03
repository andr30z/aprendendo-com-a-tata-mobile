import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivitySelection, Settings } from "../../Pages";

const BottomTab = createBottomTabNavigator();

/**
 * This is the main navigation container of the application.
 * @author andr3z0
 **/
const MainBottomNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="ActivitySelection"
          component={ActivitySelection}
        />
        <BottomTab.Screen name="Settings" component={Settings} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default MainBottomNavigation;
