import React, { Dispatch, SetStateAction } from "react";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../../../GlobalStyles/Containers.Style";
import { useScreenOrientation } from "../../../../Hooks";
import { StoryItem } from "../../../Interfaces";
import * as ScreenOrientation from "expo-screen-orientation";
import { Image } from "react-native";

interface PageProps {
  page: StoryItem;
  //   currentActivePagePosition: number;
  //   pageIndex: number;
  setShowActionButtons: Dispatch<SetStateAction<boolean>>;
}

const paragraphImagePositions = {
  top: "column",
  left: "row",
  right: "row-reverse",
  bottom: "column-reverse",
};

const Page: React.FC<PageProps> = ({
  page,
  //   currentActivePagePosition,
  //   pageIndex,
  setShowActionButtons,
}) => {
  const { currentOrientation } = useScreenOrientation();
  return (
    <ScrollContainer
      onScrollBeginDrag={() => setShowActionButtons(false)}
      onScrollEndDrag={() => setShowActionButtons(true)}
      collapsable={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <BaseContainer
        style={{ paddingHorizontal: "3%" }}
        height="100%"
        width="100%"
        flexDirection="column"
        justify="space-evenly"
      >
        {page.title && (
          <BaseText
            marginVertical="10px"
            color="#000"
            fontWeight="900"
            fontSize="24px"
          >
            {page.title}
          </BaseText>
        )}
        {page.paragraphs.map((paragraph, idx) => {
          const image = paragraph.image;
          const isBottomOrTopPosition =
            paragraph.imagePosition === "bottom" ||
            paragraph.imagePosition === "top";
          return (
            <BaseContainer
              width="100%"
              marginVertical="10px"
              key={idx}
              align="center"
              flexDirection={
                !paragraph.imagePosition
                  ? ("row" as any)
                  : paragraphImagePositions[paragraph.imagePosition]
              }
            >
              {image &&
                (currentOrientation ===
                  ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
                  isBottomOrTopPosition) && (
                  <Image
                    style={{
                      marginVertical: isBottomOrTopPosition ? 0 : 8,
                      height: 200,
                      width: "100%",
                    }}
                    resizeMode="contain"
                    width={isBottomOrTopPosition ? 100 : 25}
                    source={{ uri: image }}
                  />
                )}
              <BaseContainer
                marginBottom="10px"
                width={isBottomOrTopPosition ? "100%" : "70%"}
                flexDirection="column"
                align="flex-start"
              >
                {paragraph.title && (
                  <BaseText
                    marginBottom="5px"
                    color="#000"
                    fontWeight="700"
                    fontSize="20px"
                  >
                    {paragraph.title}
                  </BaseText>
                )}
                <BaseText
                  style={{ lineHeight: 25 }}
                  color="#000"
                  fontWeight="500"
                  fontSize="17px"
                >
                  {paragraph.text}
                </BaseText>
              </BaseContainer>
            </BaseContainer>
          );
        })}
      </BaseContainer>
    </ScrollContainer>
  );
};

export default Page;
