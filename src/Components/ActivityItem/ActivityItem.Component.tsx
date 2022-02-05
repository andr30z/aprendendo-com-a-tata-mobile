import { AntDesign } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleProp, useWindowDimensions, View, ViewStyle } from "react-native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ActivityCommonProps } from "../../Interfaces/index";
import { getRandomInt } from "../../Utils";
import { ButtonActivityItem, ButtonContainer, ItemTitle } from "./Styles";
import Hypher from "hypher";
import pt from "hyphenation.pt";
const backgroundColor = [
  "#83CAF6",
  "#9188E5",
  "#F48C7F",
  "#3C8F7C",
  "#FF4C4C",
  "#355389",
];

const hypher = new Hypher(pt);

interface BaseActivityItemProps {
  itemIndex: number;
  onPress: (activity: ActivityCommonProps<unknown>) => void;
  roundedBorders?: boolean;
  boxWidth?: string;
  containerHeight?: string;
  marginTop?: string;
  buttonContainerStyles?: StyleProp<ViewStyle>;
  marginHorizontal?: string;
  renderMidComponent?: () => React.ReactNode;
}

/**
 * Card item that represents an activity, this card will lead to another screen when pressed
 * @param difficulty number that represents the current dificulty of the activity
 * @param name string that indicates the name of the activity
 * @param itemIndex number that indicates the actual index of the item, this is used to provide a background color for the card
 * @param tags an array of tags that represents topics related to the activity
 * @author andr30z
 **/
const ActivityItem: React.FC<
  ActivityCommonProps<unknown> & BaseActivityItemProps
> = ({
  difficulty,
  name,
  itemIndex,
  onPress,
  boxWidth = "40%",
  roundedBorders = true,
  containerHeight,
  marginTop = "20px",
  buttonContainerStyles,
  children,
  renderMidComponent,
  marginHorizontal,
  ...rest
}) => {
  const stars = useMemo(() => Array.from({ length: difficulty }), [difficulty]);
  const randomInt = useMemo(() => getRandomInt(0, 5), []);
  const { height } = useWindowDimensions();
  return (
    <ButtonContainer
      marginTop={marginTop}
      backgroundColor={backgroundColor[randomInt]}
      height={`${containerHeight ? containerHeight : height * 0.2}px`}
      width={boxWidth}
      marginHorizontal={marginHorizontal}
      roundedBorders={roundedBorders}
      style={buttonContainerStyles}
    >
      <ButtonActivityItem
        onPress={() => onPress({ ...rest, difficulty, name })}
        activeOpacity={0.1}
      >
        <BaseContainer
          height="100%"
          width="100%"
          flexDirection="column"
          align="center"
          justify="center"
          flex={1}
          // style={{
          //   position: "relative",
          // }}
        >
          <BaseContainer
            flex={1}
            flexDirection="column"
            align="center"
            justify="center"
          >
            <BaseContainer flex={2} width="100%" align="center" justify="center">
              <ItemTitle android_hyphenationFrequency="full">{hypher.hyphenateText(name).replace(/\u00AD/g, "\u200B")}</ItemTitle>
            </BaseContainer>
            {renderMidComponent && renderMidComponent()}
          </BaseContainer>
          <BaseContainer
            flexDirection="row"
            style={{
              position: "absolute",
              top: 0,
              right: -10,
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
      </ButtonActivityItem>
      {children}
    </ButtonContainer>
  );
};

export default ActivityItem;
