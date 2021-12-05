import React, { useRef, useState } from "react";
import {
  ScrollView, StatusBar,


  useWindowDimensions
} from "react-native";
import {
  ScrollContainer
} from "../../GlobalStyles/Containers.Style";
import { ActivityList } from "./Modules";


/**
 * ActivitySelectionPage aka Home, thats the place where user is going to select an activity
 * @author andr3z0
 **/
const ActivitySelection: React.FC = ({ children }) => {
  const scrollToRef = useRef<ScrollView>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { height, width } = useWindowDimensions();
  return (
    <ScrollContainer
      style={{ height: "100%" }}
      contentContainerStyle={{ paddingBottom: 100 }}
      backgroundColor="#fff"
      ref={scrollToRef as any}
    >
      <StatusBar backgroundColor="#8078cc" translucent />
      {children}
      {/* <ActivityIntroduction /> */}
      <ActivityList setScrollPosition={setScrollPosition} />
    </ScrollContainer>
  );
};

export default ActivitySelection;
