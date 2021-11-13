import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MotiView } from "@motify/components";
import { useAnimationState } from "@motify/core";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useMemo, useRef } from "react";
import { useWindowDimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useClassroomContext, useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { Post } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import {
  PostFooterContainer,
  PostItemContainer,
  styles,
  TextPostContainer,
} from "./Styles";

interface PostItemProps {
  post: Post;
  getPosts: () => void;
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
const PostItem: React.FC<PostItemProps> = ({ post, getPosts }) => {
  const { height, width } = useWindowDimensions();

  const postDate = useMemo(
    () =>
      formatRelative(new Date(post.createdAt), new Date(), {
        locale: ptBR,
      }),
    [post.createdAt]
  );

  const deletePost = () => {
    return baseApi.delete(baseApiRoutes.POSTS + "/" + post._id).then((res) => {
      Toast.show({
        text1: "Post deletado com sucesso",
      });
      return getPosts();
    });
  };
  const { primaryTheme, textTheme } = useClassroomContext();
  const { user, userIsTeacher } = useUserContext();
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
      >
        <BaseContainer align="center" flexDirection="row">
          <ProfilePhoto
            size={40}
            source={{
              uri: post.author.profilePhoto || "https://imgur.com/H5PWtBp.png",
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
        </BaseContainer>
        {(userIsTeacher || user?._id === post.author._id) && (
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
            <IconWithTouchable
              onPress={() => null}
              iconName="circle-edit-outline"
              textTheme={textTheme}
            />
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
          numberOfLines={4}
          seeLessText="Ver menos"
          seeMoreText="Ver mais"
        >
          {post.text}
        </ReadMore>
      </TextPostContainer>
      <PostFooterContainer flex={1}>
        <AntDesign name="like2" size={25} color="#c3c3c3" />
        <FontAwesome5
          style={styles.iconComment}
          name="comment"
          size={25}
          color="#c3c3c3"
        />
      </PostFooterContainer>
    </PostItemContainer>
  );
};

export default PostItem;
