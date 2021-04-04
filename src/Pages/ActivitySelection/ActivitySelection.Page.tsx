import React from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { Mockup } from "./ApiMockup.constant";

import { StatusBar } from "react-native";
import { CONSTANTS } from "../../Constants";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../Components/Input/Input.Component";
import { ActivityList, HeaderActivity } from "./Modules";

/**
 * ActivitySelectionPage aka Home, thats the place where user is going to select an activity
 * @author andr3z0
 **/
const ActivitySelection: React.FC = ({ children }) => {
  return (
    <ScrollContainer style={{ height: "100%" }} backgroundColor="#transparent">
      <StatusBar backgroundColor="#f2066d" translucent />
      <LinearGradient
        style={{
          marginTop: 30,
          height: CONSTANTS.DEVICE_HEIGHT*85/100,
          flex: 1,
          flexDirection: "column",
        }}
        colors={["#f2066d", "#7d00ff"]}
      >
        {children}
        <HeaderActivity />
      </LinearGradient>
      <ActivityList />
    </ScrollContainer>
  );
};

export default ActivitySelection;
