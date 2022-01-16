import React, { useRef, useState } from "react";
import { ScrollView, StatusBar, useWindowDimensions } from "react-native";
import {
  ScrollContainer,
  BaseContainer,
} from "../../GlobalStyles/Containers.Style";
import { ActivityList } from "./Modules";
import { CloudsContainer } from "../../Components";

/**
 * ActivitySelectionPage aka Home, thats the place where user is going to select an activity
 * @author andr30z
 **/
const ActivitySelection: React.FC = ({ children }) => {
  const scrollToRef = useRef<ScrollView>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  return (
    <BaseContainer backgroundColor="#fff" flex={1} position="relative">
      <ScrollContainer
        style={{ height: "100%", zIndex: 2 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        backgroundColor="transparent"
        ref={scrollToRef as any}
      >
        <StatusBar backgroundColor="#8078cc" translucent />
        {children}
        {/* <ActivityIntroduction /> */}
        <ActivityList setScrollPosition={setScrollPosition} />
      </ScrollContainer>
      <CloudsContainer />
    </BaseContainer>
  );
};

export default ActivitySelection;
