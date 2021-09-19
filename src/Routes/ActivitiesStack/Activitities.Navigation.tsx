import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainBottomNavigation from "../MainBottom/MainBottom.Navigation";
import { ROUTES_NAME } from "./RoutesName";
import { ActivityDetails } from "../../Pages";
import { WithStatusBar } from "../../Components";

const StackTab = createStackNavigator();
const ActivityDetailsWithStatusBar = WithStatusBar(ActivityDetails);
/**
 * This is the Activities stack navigation container of the application.
 * @author andr3z0
 **/
const ActivitiesStackNavigation: React.FC = () => {
  return (
    <StackTab.Navigator
      initialRouteName={ROUTES_NAME.ACTIVITYDETAILS}
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackTab.Screen
        name={ROUTES_NAME.MAINBOTTOM}
        component={MainBottomNavigation}
      />
      <StackTab.Screen
        name={ROUTES_NAME.ACTIVITYDETAILS}
        component={ActivityDetailsWithStatusBar}
      />
    </StackTab.Navigator>
  );
};

export default ActivitiesStackNavigation;
