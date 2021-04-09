import React from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { Mockup } from "./ApiMockup.constant";

import { StatusBar } from "react-native";
import { CONSTANTS } from "../../Constants";
import { ActivityList, HeaderActivity } from "./Modules";

/**
 * ActivitySelectionPage aka Home, thats the place where user is going to select an activity
 * @author andr3z0
 **/
const ActivitySelection: React.FC = ({ children }) => {
  return (
    <ScrollContainer
      style={{ height: "100%" }}
      contentContainerStyle={{ paddingBottom: 100 }}
      backgroundColor="#fff"
    >
      <StatusBar backgroundColor="#8078cc" translucent />
      <BaseContainer
        style={{
          marginTop: 30,
          height: (CONSTANTS.DEVICE_HEIGHT * 75) / 100,
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#8F86E3",
        }}
      >
        {children}
        <HeaderActivity />
      </BaseContainer>
      <ActivityList activities={Mockup} />
    </ScrollContainer>
  );
};

export default ActivitySelection;
