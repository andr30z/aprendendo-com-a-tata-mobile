import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainBottomNavigation from "../MainBottom/MainBottom.Navigation";
import { ROUTES_NAME } from "./RoutesName";
import { ActivityDetails, ActivityPlay } from "../../Pages";
import { WithStatusBar } from "../../Components";
import { ActivitiesStackParamList } from "./Interfaces";

const StackTab = createStackNavigator<ActivitiesStackParamList>();
const ActivityDetailsWithStatusBar = WithStatusBar(ActivityDetails);
const ActivityPlayWithStatusBar = WithStatusBar(ActivityPlay);
/**
 * This is the Activities stack navigation container of the application.
 * @author andr3z0
 **/
const ActivitiesStackNavigation: React.FC = () => {
  
  return (
    <StackTab.Navigator
      initialRouteName={ROUTES_NAME.MAIN_BOTTOM}
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackTab.Screen
        name={ROUTES_NAME.MAIN_BOTTOM}
        component={MainBottomNavigation}
      />
      <StackTab.Screen
        name={ROUTES_NAME.DETAILS}
        component={ActivityDetailsWithStatusBar}
      />
      <StackTab.Screen
        name={ROUTES_NAME.ACTIVITY_PLAY}
        component={ActivityPlayWithStatusBar}
      />
    </StackTab.Navigator>
  );
};

export default ActivitiesStackNavigation;
