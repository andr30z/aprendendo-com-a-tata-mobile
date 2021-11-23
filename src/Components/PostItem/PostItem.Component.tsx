import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MotiView } from "@motify/components";
import { useAnimationState } from "@motify/core";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useMemo, useRef } from "react";
import { useWindowDimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import CreatePost from "../CreatePost/CreatePost.Component";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { Post, PostTypes } from "../../Interfaces/index";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { baseApi, baseApiRoutes } from "../../Services";
import { formatFilePathUrl } from "../../Utils";
import ActivityItem from "../ActivityItem/ActivityItem.Component";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import {
  ActivityContainer,
  PostFooterContainer,
  PostItemContainer,
  styles,
  TextPostContainer,
  TouchableHeader,
} from "./Styles";
import { ClassRoomInterface } from "../../Interfaces/index";

interface PostItemProps {
  post: Post;
  getPosts?: () => void;
  primaryTheme: string;
  textTheme: string;
  classroom: ClassRoomInterface;
  isRenderedInPostDetailsPage?: boolean;
}

const IconWithTouchable: React.FC<{
  onPress: () => void;
  textTheme?: string;
  iconName: string;
  hideStyles?: boolean;
}> = ({ onPress, textTheme, hideStyles = false, iconName }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <MaterialCommunityIcons
      name={iconName as any}
      size={25}
      style={hideStyles ? undefined : styles.iconDots}
      color={textTheme || "white"}
    />
  </TouchableWithoutFeedback>
);

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
  const { height, width } = useWindowDimensions();
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
  const postDate = useMemo(
    () =>
      formatRelative(new Date(post.createdAt), new Date(), {
        locale: ptBR,
      }),
    [post.createdAt]
  );

  const deletePost = useCallback(() => {
    return baseApi.delete(baseApiRoutes.POSTS + "/" + post._id).then((res) => {
      Toast.show({
        text1: "Post deletado com sucesso",
      });
      if (getPosts) return getPosts();
    });
  }, []);

  const dotsAnimationState = useAnimationState({
    closed: {
      height: 30,
    },
    open: {
      height: 105,
    },
    from: {
      height: 30,
    },
  });
  const toggleDotsAnimation = () => {
    dotsAnimationState.transitionTo(
      dotsAnimationState.current === "closed" ||
        dotsAnimationState.current === "from"
        ? "open"
        : "closed"
    );
  };
  const sheetRef = useRef<BottomSheetModal | null>(null);
  const userIsAuthor = user?._id === post.author._id;
  return (
    <PostItemContainer deviceHeight={height}>
      <ConfirmationModal
        confirmationQuestion="Deseja realmente deletar este post?"
        onConfirm={deletePost}
        modalRef={sheetRef}
      />
      <BaseContainer
        flexDirection="row"
        align="center"
        justify="space-between"
        position="relative"
        flex={1}
      >
        <TouchableHeader
          deviceWidth={width}
          onPress={goToPostDetails}
          activeOpacity={0.1}
          underlayColor="#dddd"
          delayLongPress={500}
        >
          <>
            <ProfilePhoto
              size={50}
              source={{
                uri:
                  formatFilePathUrl(post.author.profilePhoto?.path) ||
                  "https://imgur.com/H5PWtBp.png",
              }}
            />
            <BaseContainer width={`${width * 0.7}px`} flexDirection="column">
              <BaseText
                ellipsizeMode="tail"
                numberOfLines={1}
                marginLeft="13px"
                color="black"
              >
                {post.author.name}
              </BaseText>
              <BaseText marginLeft="13px" fontSize="13px" color="grey">
                {postDate}
              </BaseText>
            </BaseContainer>
          </>
        </TouchableHeader>
        {(userIsTeacher || userIsAuthor) && (
          <MotiView
            style={{ ...styles.dotsContainer, backgroundColor: primaryTheme }}
            state={dotsAnimationState}
          >
            <IconWithTouchable
              onPress={toggleDotsAnimation}
              iconName="dots-horizontal"
              hideStyles
              textTheme={textTheme}
            />
            {userIsAuthor && (
              <CreatePost
                classroom={classroom}
                initialValues={post}
                onPostCreation={getPosts as any}
              >
                {(ref) => (
                  <IconWithTouchable
                    onPress={() => ref.current?.present()}
                    iconName="circle-edit-outline"
                    textTheme={textTheme}
                  />
                )}
              </CreatePost>
            )}
            <IconWithTouchable
              iconName="delete"
              textTheme={textTheme}
              onPress={() => sheetRef.current?.present()}
            />
          </MotiView>
        )}
      </BaseContainer>
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
