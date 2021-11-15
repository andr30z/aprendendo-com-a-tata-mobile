import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainBottomNavigation from "../MainBottom/MainBottom.Navigation";
import { ROUTES_NAME } from "./RoutesName";
import {
  ActivityDetails,
  ActivityPlay,
  ClassroomDetails,
  PostDetails,
} from "../../Pages";
import { WithStatusBar } from "../../Components";
import { MainStackParamList } from "./Interfaces";
import { AntDesign } from "@expo/vector-icons";
import { BaseText } from "../../GlobalStyles/BaseStyles";
const StackTab = createStackNavigator<MainStackParamList>();
const ActivityPlayWithStatusBar = WithStatusBar(ActivityPlay);
const ClassroomDetailsWithStatusBar = WithStatusBar(ClassroomDetails);
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
        options={{
          headerTitle: ({ tintColor }) => (
            <BaseText fontSize={"18px"} color={tintColor || "black"}>
              Atividade
            </BaseText>
          ),
          headerLeft: ({ onPress }) => (
            <AntDesign
              onPress={onPress}
              name="arrowleft"
              size={24}
              style={{ marginLeft: 15, marginTop:5 }}
              color="black"
            />
          ),
          headerShown: true,
        }}
        component={ActivityDetails}
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
        options={{
          headerTitle: ({ tintColor }) => (
            <BaseText fontSize={"18px"} color={tintColor || "black"}>
              Post
            </BaseText>
          ),
          headerLeft: ({ onPress }) => (
            <AntDesign
              onPress={onPress}
              name="arrowleft"
              size={24}
              style={{ marginLeft: 15, marginTop:5 }}
              color="black"
            />
          ),
          headerShown: true,
        }}
        name={ROUTES_NAME.POST_DETAILS}
        component={PostDetails}
      />
    </StackTab.Navigator>
  );
};

export default MainStackNavigation;
