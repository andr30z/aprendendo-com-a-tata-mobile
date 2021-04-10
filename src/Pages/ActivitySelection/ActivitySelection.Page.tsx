import React, { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { Mockup } from "./ApiMockup.constant";

import { Pressable, StatusBar, View, ScrollView } from "react-native";
import { CONSTANTS } from "../../Constants";
import { ActivityIntroduction, ActivityList, ActivityHeader } from "./Modules";
import { LinearGradient } from "expo-linear-gradient";

/**
 * ActivitySelectionPage aka Home, thats the place where user is going to select an activity
 * @author andr3z0
 **/
const ActivitySelection: React.FC = ({ children }) => {
  const scrollToRef = useRef<ScrollView>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  return (
    <ScrollContainer
      style={{ height: "100%" }}
      contentContainerStyle={{ paddingBottom: 100 }}
      backgroundColor="#fff"
      ref={scrollToRef as any}
    >
      <StatusBar backgroundColor="#8078cc" translucent />
      <BaseContainer
        style={{
          marginTop: 30,
          height: (CONSTANTS.DEVICE_HEIGHT * 75) / 100,
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#8F86E3",
          position: "relative",
        }}
      >
        {children}
        <ActivityHeader />
        <View
          style={{
            position: "absolute",
            bottom: -29,
            left: 0,
            right: 0,
            width: CONSTANTS.DEVICE_WIDTH,
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              console.log(scrollPosition, "possss");
              scrollToRef.current?.scrollTo({
                y: scrollPosition + 200,
                x: scrollPosition,
                animated: true,
              });
            }}
          >
            <LinearGradient
              colors={["#8078cc", "#8F86E3"]}
              style={{
                borderRadius: 60 / 2,
                height: 60,
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
              }}
              locations={[0.5, 0.5]}
            >
              <Entypo name="chevron-down" size={44} color="#f7cc7f" />
            </LinearGradient>
          </Pressable>
        </View>
      </BaseContainer>
      <ActivityIntroduction />
      <ActivityList setScrollPosition={setScrollPosition} activities={Mockup} />
    </ScrollContainer>
  );
};

export default ActivitySelection;
