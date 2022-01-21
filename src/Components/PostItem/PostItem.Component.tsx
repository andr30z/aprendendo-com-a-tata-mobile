import ReadMore from "@fawazahmed/react-native-read-more";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo, useRef } from "react";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../Button/Button.Component";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ClassRoomInterface, Post, PostTypes } from "../../Interfaces/index";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { baseApi, baseApiRoutes } from "../../Services";
import ActivityItem from "../ActivityItem/ActivityItem.Component";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import { ActivityResultValue, PostHeader } from "./Modules";
import {
  ActivityContainer,
  PostItemContainer,
  TextPostContainer,
  PostFooterContainer,
} from "./Styles";

interface PostItemProps {
  post: Post;
  getPosts?: () => void;
  primaryTheme: string;
  textTheme: string;
  classroom: ClassRoomInterface;
  isRenderedInPostDetailsPage?: boolean;
}

/**
 * Post item listing component.
 * @author andr30z
 **/
const PostItem: React.FC<PostItemProps> = ({
  post,
  getPosts,
  primaryTheme,
  textTheme,
  isRenderedInPostDetailsPage = false,
  classroom,
}) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { user, userIsTeacher } = useUserContext();
  const goToPostDetails = useCallback(() => {
    navigation.navigate(ROUTES_NAME.POST_DETAILS, {
      post,
      primaryTheme,
      textTheme,
      classroom,
    });
  }, [post, classroom, primaryTheme, textTheme]);
  const userPostActivityResult = useMemo(
    () => post.postActivityResult?.find((x) => x.user._id === user?._id),
    [post.postActivityResult]
  );
  const goToActivityDetails = (activityId: string) => {
    navigation.navigate(ROUTES_NAME.DETAILS, {
      activityId,
      postActivityResult: userPostActivityResult,
      postId: post._id,
      routeIndexToReturnOnFinish: 2,
    });
  };

  const deletePost = useCallback(() => {
    return baseApi.delete(baseApiRoutes.POSTS + "/" + post._id).then((res) => {
      Toast.show({
        text1: "Post deletado com sucesso",
      });
      if (getPosts) return getPosts();
    });
  }, []);
  const isPostActivity = post.type === PostTypes.A;
  const sheetRef = useRef<BottomSheetModal | null>(null);
  return (
    <PostItemContainer deviceHeight={height}>
      <ConfirmationModal
        confirmationQuestion="Deseja realmente deletar este post?"
        onConfirm={deletePost}
        modalRef={sheetRef}
      />
      <PostHeader
        goToPostDetails={goToPostDetails}
        primaryTheme={primaryTheme}
        textTheme={textTheme}
        classroom={classroom}
        getPosts={getPosts}
        post={post}
        sheetRef={sheetRef}
      />
      <TextPostContainer>
        <ReadMore
          numberOfLines={isRenderedInPostDetailsPage ? 100 : 4}
          seeLessText="Ver menos"
          seeMoreText="Ver mais"
        >
          {post.text}
        </ReadMore>
      </TextPostContainer>
      {isPostActivity && post.activities && (
        <BaseContainer paddingHorizontal="3%">
          <BaseText color="black">Atividades:</BaseText>
          <ActivityContainer>
            {post.activities.map((a, index) => (
              <ActivityItem
                roundedBorders={false}
                boxWidth="30%"
                marginTop="10px"
                marginHorizontal="5px"
                containerHeight="150"
                renderMidComponent={() => (
                  <ActivityResultValue
                    activityId={a._id}
                    userActivityResult={
                      userPostActivityResult?.activitiesResult
                    }
                  />
                )}
                onPress={() => goToActivityDetails(a._id)}
                itemIndex={index}
                {...a}
                key={a._id}
              />
            ))}
          </ActivityContainer>
        </BaseContainer>
      )}
      {userIsTeacher && isPostActivity && (
        <PostFooterContainer flex={1}>
          <Button
            hasElevation={false}
            buttonWidth="140px"
            textStyles={{ fontSize: "16px" }}
            onPress={() =>
              navigation.navigate(ROUTES_NAME.TEACHER_ACTIVITY_RESULT_LISTING, {
                postActivityResult: post.postActivityResult as any,
                members: classroom.members,
                primaryTheme,
                textTheme,
              })
            }
            backgroundColor={primaryTheme}
            buttonHeight="40px"
            buttonTitle="Ver respostas"
          />
        </PostFooterContainer>
      )}
    </PostItemContainer>
  );
};

export default PostItem;
