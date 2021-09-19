import React, { Dispatch, SetStateAction } from "react";
import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ButtonActivity, LinearGradientButtonContainer } from "./Styles";

type SetPageCallbackType = (currentPage: number) => number;
interface NextPageDraggableItemProps {
  pagePosition: number;
  setCurrentPagePosition: (cb: SetPageCallbackType) => void;
  pageLimit: number;
  showActionButtons: boolean;
  setShowQuestions: Dispatch<SetStateAction<boolean>>;
}

/**
 *
 * @author andr3z0
 **/
const NextPageDraggableItem = React.memo<NextPageDraggableItemProps>(
  ({
    pagePosition,
    setCurrentPagePosition,
    pageLimit,
    setShowQuestions,
    showActionButtons,
  }) => {
    const onPressChevron = (position: "left" | "right") => () =>
      setCurrentPagePosition((past) =>
        position === "left" ? past - 1 : past + 1
      );
    return (
      <BaseContainer
        style={{
          position: "absolute",
          bottom: 20,
          right: 25,

          padding: 4,
          opacity: showActionButtons ? 1 : 0.4,
        }}
        width="160px"
        flexDirection="column"
      >
        <BaseContainer
          style={{ borderRadius: 10 }}
          flex={1}
          height="50px"
          width="100%"
          flexDirection="row"
          backgroundColor="#dbdbdb"
          justify="space-evenly"
          align="center"
        >
          <Pressable
            onPress={pagePosition === 1 ? undefined : onPressChevron("left")}
          >
            <Entypo name="chevron-left" size={45} color="#afafaf" />
          </Pressable>
          <BaseText align="center" color="#757575" fontSize="25px">
            {pagePosition}
          </BaseText>
          <Pressable
            onPress={
              pageLimit === pagePosition ? undefined : onPressChevron("right")
            }
          >
            <Entypo name="chevron-right" size={45} color="#afafaf" />
          </Pressable>
        </BaseContainer>
        <LinearGradientButtonContainer
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#0093E9", "#80D0C7"]}
        >
          <ButtonActivity onPress={() => setShowQuestions((past) => !past)}>
            <AntDesign name="form" size={24} color="#fff" />
            <BaseText marginLeft="5px" align="center">
              Questionário
            </BaseText>
          </ButtonActivity>
        </LinearGradientButtonContainer>
      </BaseContainer>
    );
  }
);

export default NextPageDraggableItem;
