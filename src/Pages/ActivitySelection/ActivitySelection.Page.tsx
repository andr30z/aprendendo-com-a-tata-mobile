import React, { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { Mockup } from "./ApiMockup.constant";

import {
  Pressable,
  StatusBar,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { CONSTANTS } from "../../Constants";
import { ActivityIntroduction, ActivityList, ActivityHeader } from "./Modules";
import { LinearGradient } from "expo-linear-gradient";
import { useKeyboardHideEvent } from "../../Hooks/useKeyboardHideEvent";

/**
 * ActivitySelectionPage aka Home, thats the place where user is going to select an activity
 * @author andr3z0
 **/
const ActivitySelection: React.FC = ({ children }) => {
  const scrollToRef = useRef<ScrollView>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  useKeyboardHideEvent();
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
