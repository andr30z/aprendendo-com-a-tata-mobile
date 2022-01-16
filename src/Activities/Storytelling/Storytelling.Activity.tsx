import * as ScreenOrientation from "expo-screen-orientation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import PagerView from "react-native-pager-view";
import { useActivityPlayContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useScreenOrientation } from "../../Hooks";
import { usePageViewerLogic } from "../Hooks";
import { StoryActivityAnswer, StorytellingInterface } from "../Interfaces";
import { Page, PageController, Questions } from "./Components";

interface StorytellingProps {
  activity: StorytellingInterface;
}

/**
 *
 * @author andr30z
 **/
const Storytelling: React.FC<StorytellingProps> = ({ activity }) => {
  const { isActivityResultView, activityAnswers } = useActivityPlayContext();
  const [storyActivityAnswer, setStoryActivityAnswer] =
    useState<StoryActivityAnswer>(
      isActivityResultView ? activityAnswers.current[0].activity || [] : []
    );
  const [showActionButtons, setShowActionsButtons] = useState(true);
  const { currentOrientation } = useScreenOrientation(
    ScreenOrientation.OrientationLock.ALL,
    ScreenOrientation.OrientationLock.PORTRAIT
  );
  const isDrawerOpen = useRef(false);
  const {
    currentPageControllerPosition,
    onPageChange,
    pageViewRef,
    setCurrentPosition,
  } = usePageViewerLogic();

  const drawerRef = useRef<DrawerLayout>(null);

  useEffect(() => {
    /**
     * That approach is very ugly and wrong, but solves the problem with drawer layout breaking on orientation change,
     * and I'm not going to commit/change anything inside
     * react-native-gesture-handler to fix that shit, specially after discover that they are using class components ;-;.
     * Maybe in future updates I come back on this problem again (I hope gesture handler lib fix that weird behavior ASAP).
     *
     **/
    if (
      isDrawerOpen.current &&
      drawerRef.current &&
      currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
    ) {
      drawerRef.current.closeDrawer();
      const drawerOpen = () => drawerRef.current?.openDrawer();
      const timeout = setTimeout(drawerOpen, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentOrientation]);
  const { width } = useWindowDimensions();
  const onCloseDrawer = useCallback(() => drawerRef.current?.closeDrawer(), []);
  // console.log(width, drawerRef.current?.props.drawerWidth);
  return (
    <DrawerLayout
      drawerWidth={width}
      ref={drawerRef}
      contentContainerStyle={{ width: "100%" }}
      drawerPosition={"left"}
      drawerType="front"
      drawerLockMode={"locked-open"}
      onDrawerOpen={() => (isDrawerOpen.current = true)}
      onDrawerClose={() => (isDrawerOpen.current = false)}
      drawerBackgroundColor="#c3c3c3"
      renderNavigationView={() => (
        <Questions
          questions={activity.story.questions}
          setStoryActivityAnswer={setStoryActivityAnswer}
          storyActivityAnswer={storyActivityAnswer}
          onCloseAction={onCloseDrawer}
        />
      )}
    >
      <BaseContainer style={{ position: "relative" }} flex={1}>
        <BaseContainer
          marginTop="30px"
          marginVertical="25px"
          flex={1}
          align="center"
          justify="center"
          paddingVertical="10px"
        >
          <BaseText fontSize="30px" align="center" color="#000">
            {activity.story.title}
          </BaseText>
        </BaseContainer>

        <PagerView
          pageMargin={10}
          orientation={"horizontal"}
          scrollEnabled
          ref={pageViewRef}
          transitionStyle={"curl"}
          style={{ flex: 10 }}
          initialPage={0}
          onPageSelected={onPageChange}
        >
          {activity.story.storyPages.map((page, index) => (
            <Page
              key={index}
              page={page}
              setShowActionButtons={setShowActionsButtons}
            />
          ))}
        </PagerView>
        <PageController
          pagePosition={currentPageControllerPosition + 1}
          showActionButtons={showActionButtons}
          setCurrentPagePosition={setCurrentPosition}
          setShowQuestions={() => drawerRef.current?.openDrawer()}
          pageLimit={activity.story.storyPages.length}
        />
      </BaseContainer>
    </DrawerLayout>
  );
};

export default Storytelling;
