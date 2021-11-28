import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useRef } from "react";
import { useWindowDimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ClassRoomInterface, Post, PostTypes } from "../../Interfaces/index";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { baseApi, baseApiRoutes } from "../../Services";
import ActivityItem from "../ActivityItem/ActivityItem.Component";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import { PostHeader } from "./Modules";
import {
  ActivityContainer,
  PostFooterContainer,
  PostItemContainer,
  styles,
  TextPostContainer,
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
 * @author andr3z0
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
  const { user } = useUserContext();
  const goToPostDetails = useCallback(() => {
    navigation.navigate(ROUTES_NAME.POST_DETAILS, {
      post,
      primaryTheme,
      textTheme,
      classroom,
    });
  }, [post, classroom, primaryTheme, textTheme]);

  const goToActivityDetails = (activityId: string) => {
    const userPostActivityResult = post.postActivityResult?.find(
      (x) => x.user._id === user?._id
    );

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
      {post.type === PostTypes.A && post.activities && (
        <BaseContainer paddingHorizontal="3%">
          <BaseText color="black">Atividades:</BaseText>
          <ActivityContainer>
            {post.activities.map((a, index) => (
              <ActivityItem
                roundedBorders={false}
                boxWidth="30%"
                marginTop="10px"
                marginHorizontal="5px"
                containerHeight="90"
                onPress={() => goToActivityDetails(a._id)}
                itemIndex={index}
                {...a}
                key={a._id}
              />
            ))}
          </ActivityContainer>
        </BaseContainer>
      )}
      {!isRenderedInPostDetailsPage && (
        <PostFooterContainer flex={1}>
          <AntDesign name="like2" size={25} color={primaryTheme} />
          <FontAwesome5
            style={styles.iconComment}
            name="comment"
            size={25}
            onPress={goToPostDetails}
            color={primaryTheme}
          />
        </PostFooterContainer>
      )}
    </PostItemContainer>
  );
};

export default PostItem;
