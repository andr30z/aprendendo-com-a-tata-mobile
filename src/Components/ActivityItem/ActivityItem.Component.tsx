import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { CONSTANTS } from "../../Constants";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ActivityItem as ActivityItemProps } from "../../Interfaces";
import { ItemTitle } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import Badge from "../Badge/Badge.Component";

const backgroundColor = [
  "#83CAF6",
  "#9188E5",
  "#F48C7F",
  "#3C8F7C",
  "#FF4C4C",
  "#355389",
];

interface BaseActivityItemProps {
  itemIndex: number;
}

const ActivityItem: React.FC<ActivityItemProps & BaseActivityItemProps> = ({
  level,
  name,
  description,
  itemIndex,
  tags,
}) => {
  const stars = useMemo(() => Array.from({ length: level }), []);

  return (
    <TouchableOpacity
      style={{
        height: (CONSTANTS.DEVICE_HEIGHT * 25) / 100,
        marginTop: 20,
        backgroundColor: backgroundColor[itemIndex],
        borderRadius: 30,
        paddingVertical: "5%",
        paddingHorizontal: 20,
      }}
      activeOpacity={0.83}
    >
      <BaseContainer
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <BaseContainer style={{ flexDirection: "row", width: "100%" }}>
          <BaseContainer align="flex-start" style={{ flexDirection: "column" }}>
            <ItemTitle>{name}</ItemTitle>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {tags.map((tag, index) => {
                return (
                  <Badge
                    key={tag}
                    pill
                    text={tag}
                    extraContainerStyles={{
                      marginLeft: index === 0 ? 0 : 5,
                      marginTop: 5,
                    }}
                  />
                );
              })}
            </View>
          </BaseContainer>
          <BaseContainer
            style={{
              flexDirection: "column",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <BaseText fontSize="12px" align="center" color="#fff">
              Dificuldade
            </BaseText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {stars.map((_, position) => {
                return (
                  <AntDesign
                    key={String(itemIndex + "/" + position)}
                    name="star"
                    size={12}
                    color="#e5e500"
                    style={{ alignSelf: "center" }}
                  />
                );
              })}
            </View>
          </BaseContainer>
        </BaseContainer>
        <BaseContainer justify="center" align="flex-start">
          <BaseText align="left">{description}</BaseText>
        </BaseContainer>
      </BaseContainer>
    </TouchableOpacity>
  );
};

export default ActivityItem;
