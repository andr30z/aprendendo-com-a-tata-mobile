import { AntDesign } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ActivityCommonProps } from "../../Interfaces/index";
import { getRandomInt } from "../../Utils";
import { ButtonContainer, ItemTitle } from "./Styles";

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

/**
 * Card item that represents an activity, this card will lead to another screen when pressed
 * @param dificulty number that represents the current dificulty of the activity
 * @param name string that indicates the name of the activity
 * @param itemIndex number that indicates the actual index of the item, this is used to provide a background color for the card
 * @param tags an array of tags that represents topics related to the activity
 * @author andr3z0
 **/
const ActivityItem: React.FC<
  ActivityCommonProps<unknown> & BaseActivityItemProps
> = ({ dificulty, name, itemIndex }) => {
  const stars = useMemo(() => Array.from({ length: dificulty }), []);
  const randomInt = useMemo(() => getRandomInt(0, 5), []);
  const { height } = useWindowDimensions();
  return (
    <ButtonContainer
      backgroundColor={backgroundColor[randomInt]}
      height={`${height * 0.2}px`}
      width="40%"
      activeOpacity={0.83}
    >
      <BaseContainer
        height="100%"
        width="100%"
        flexDirection="column"
        style={{
          position: "relative",
        }}
      >
        <BaseContainer align="center" justify="center">
          <ItemTitle>{name}</ItemTitle>
          {/* <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
            </View> */}
        </BaseContainer>
        <BaseContainer
          flexDirection="row"
          style={{
            position: "absolute",
            top: -5,
            right: 0,
          }}
        >
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
      {/* <BaseContainer justify="center" align="flex-start">
          <BaseText align="left">{name}</BaseText>
        </BaseContainer> */}
    </ButtonContainer>
  );
};

export default ActivityItem;
