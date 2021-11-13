import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { MotiView } from "@motify/components";
import { useAnimationState } from "@motify/core";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useMemo } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { Post } from "../../Interfaces/index";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import {
  PostFooterContainer,
  PostItemContainer,
  styles,
  TextPostContainer,
} from "./Styles";

interface PostItemProps {
  post: Post;
}

/**
 * Post item listing component.
 * @author andr3z0
 **/
const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { height, width } = useWindowDimensions();

  const postDate = useMemo(
    () =>
      formatRelative(new Date(post.createdAt), new Date(), {
        locale: ptBR,
      }),
    [post.createdAt]
  );
  const { user, userIsTeacher } = useUserContext();
  const dotsAnimationState = useAnimationState({
    closed: {
      height: 30,
    },
    open: {
      height: 100,
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
  return (
    <PostItemContainer deviceHeight={height}>
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
        <MotiView
          style={[styles.dotsContainer, { backgroundColor: "blue" }]}
          state={dotsAnimationState}
        >
          <Pressable onPress={toggleDotsAnimation}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color="#c3c3c3"
            />
          </Pressable>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={24}
            style={styles.iconDots}
            color="yellow"
          />
          <MaterialCommunityIcons
            style={styles.iconDots}
            name="delete"
            size={24}
            color="red"
          />
        </MotiView>
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
