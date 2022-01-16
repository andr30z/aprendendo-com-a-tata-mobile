import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ProfilePhoto from "../../../ProfilePhoto/ProfilePhoto.Component";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { styles, TouchableHeader } from "../../Styles";
import { formatFilePathUrl } from "../../../../Utils";
import CreatePost from "../../../CreatePost/CreatePost.Component";
import { useWindowDimensions } from "react-native";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { useUserContext } from "../../../../Contexts";
import { MotiView, useAnimationState } from "moti";
import { Post, ClassRoomInterface } from "../../../../Interfaces/index";
import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFormatRelativeDate } from "../../../../Hooks";

interface PostHeaderProps {
  goToPostDetails: () => void;
  post: Post;
  textTheme: string;
  primaryTheme: string;
  classroom: ClassRoomInterface;
  getPosts?: () => void;
  sheetRef: React.MutableRefObject<BottomSheetModalMethods | null>;
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
 * Post header
 * @author andr30z
 **/
export const PostHeader: React.FC<PostHeaderProps> = ({
  goToPostDetails,
  post,
  primaryTheme,
  textTheme,
  classroom,
  getPosts,
  sheetRef,
}) => {
  const { width } = useWindowDimensions();
  const { userIsTeacher, user } = useUserContext();
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
  const postDate = useFormatRelativeDate(post.createdAt);
  const userIsAuthor = user?._id === post.author._id;
  return (
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
  );
};
