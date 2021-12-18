import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useIsFocused } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { CreatePost, PostItem } from "../../../../Components";
import { useClassroomContext, useUserContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { useBoolean, useCancellablePromise } from "../../../../Hooks";
import {
  ClassRoomInterface,
  Post as PostInterface,
} from "../../../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../../../Services";
import { formatFilePathUrl } from "../../../../Utils";
import { PostModuleContainer, PostText, ProfileImage } from "./Styles";

interface GetPostsApiRespose {
  posts: Array<PostInterface>;
}
const Post: React.FC = () => {
  const { classroom, primaryTheme, textTheme } = useClassroomContext();
  const { userIsTeacher, user } = useUserContext();
  const { value: isLoadingPosts, setTrue, setFalse } = useBoolean();
  const { cancellablePromise } = useCancellablePromise();
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState<Array<PostInterface>>([]);
  useEffect(() => {
    getPosts();
  }, [classroom, isFocused]);
  const openCreatePostModal =
    (sheetRef: React.RefObject<BottomSheetModalMethods>) => () => {
      if (sheetRef.current) sheetRef.current.present();
    };

  const getPosts = useCallback(() => {
    setTrue();
    cancellablePromise(
      baseApi.get<GetPostsApiRespose>(
        baseApiRoutes.POSTS_BY_CLASSES(String(classroom?._id))
      )
    )
      .then((res) => {
        setPosts(res.data.posts.reverse());
        setFalse();
      })
      .catch(setFalse);
  }, [classroom]);
  return (
    <BaseContainer backgroundColor="#d6d6d6" paddingVertical="20px">
      {userIsTeacher && (
        <CreatePost onPostCreation={getPosts} classroom={classroom as any}>
          {(ref) => (
            <PostModuleContainer
              backgroundColor="white"
              paddingVertical="10px"
              align="center"
              justify="center"
              height="100px"
              width="100%"
            >
              <BaseContainer
                width="100%"
                flex={2}
                flexDirection="row"
                justify="center"
                align="center"
              >
                <ProfileImage
                  size={40}
                  source={{
                    uri:
                      formatFilePathUrl(user?.profilePhoto?.path) ||
                      "https://imgur.com/H5PWtBp.png",
                  }}
                />
                <Pressable
                  style={{ flex: 1, height: 40 }}
                  onPress={openCreatePostModal(ref)}
                >
                  <PostText align="left" color="black">
                    Escreva algo...
                  </PostText>
                </Pressable>
              </BaseContainer>
            </PostModuleContainer>
          )}
        </CreatePost>
      )}
      {isLoadingPosts ? (
        <ActivityIndicator size={50} color={classroom?.color} />
      ) : posts.length === 0 ? (
        <BaseContainer
          height="200px"
          align="center"
          justify="center"
          marginTop="30px"
          backgroundColor="white"
          marginHorizontal="10px"
          borderRadius="20px"
        >
          <BaseText color="black">Sem posts por aqui...</BaseText>
        </BaseContainer>
      ) : (
        posts.map((post: any) => (
          <PostItem
            classroom={classroom as ClassRoomInterface}
            primaryTheme={primaryTheme as string}
            textTheme={textTheme as string}
            getPosts={getPosts}
            key={post._id}
            post={post}
          />
        ))
      )}
    </BaseContainer>
  );
};

export default Post;
