import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainBottomNavigation from "../MainBottom/MainBottom.Navigation";
import { ROUTES_NAME } from "./RoutesName";
import { ActivityDetails, ActivityPlay, ClassroomDetails, PostDetails } from "../../Pages";
import { WithStatusBar } from "../../Components";
import { MainStackParamList } from "./Interfaces";

const StackTab = createStackNavigator<MainStackParamList>();
const ActivityDetailsWithStatusBar = WithStatusBar(ActivityDetails);
const ActivityPlayWithStatusBar = WithStatusBar(ActivityPlay);
const ClassroomDetailsWithStatusBar = WithStatusBar(ClassroomDetails);
const PostDetailsWithStatusBar = WithStatusBar(PostDetails);
/**
 * This is the Main stack navigation container of the application.
 * @author andr3z0
 **/
const MainStackNavigation: React.FC = () => {
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
      <StackTab.Screen
        name={ROUTES_NAME.CLASSROOM_DETAILS}
        component={ClassroomDetailsWithStatusBar}
      />
       <StackTab.Screen
        name={ROUTES_NAME.POST_DETAILS}
        component={PostDetailsWithStatusBar}
      />
    </StackTab.Navigator>
  );
};

export default MainStackNavigation;
