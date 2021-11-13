import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Badge, CreatePost, PostItem } from "../../../../Components";
import { useClassroomContext, useUserContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { useBoolean, useCancellablePromise } from "../../../../Hooks";
import {
  ClassRoomInterface,
  Post as PostInterface,
} from "../../../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../../../Services";
import { PostModuleContainer, PostText, ProfileImage, styles } from "./Styles";

interface GetPostsApiRespose {
  posts: Array<PostInterface>;
}
const Post: React.FC = () => {
  const { classroom } = useClassroomContext();
  const { userIsTeacher, user } = useUserContext();
  const { value: isLoadingPosts, setTrue, setFalse } = useBoolean();
  const { cancellablePromise } = useCancellablePromise();
  const [posts, setPosts] = useState<Array<PostInterface>>([]);
  useEffect(() => {
    getPosts();
  }, []);
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
  }, [classroom?._id]);
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
              flexDirection="column"
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
                  size={35}
                  source={{
                    uri: user?.profilePhoto || "https://imgur.com/H5PWtBp.png",
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

              <BaseContainer
                flex={1}
                justify="center"
                align="center"
                flexDirection="row"
                width="100%"
              >
                <Badge
                  extraContainerStyles={styles.badgeContainerStyles}
                  extraTextStyles={styles.badgeTextStyles}
                  textAlign="center"
                  pill
                  shouldLimitSize={false}
                  backgroundColor="green"
                >
                  Nova Atividade
                </Badge>
                <Badge
                  extraContainerStyles={{
                    ...styles.badgeContainerStyles,
                    marginLeft: 4,
                  }}
                  extraTextStyles={styles.badgeTextStyles}
                  pill
                  shouldLimitSize={false}
                  backgroundColor="green"
                >
                  Novo Post
                </Badge>
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
        posts.map((post: any) => <PostItem getPosts={getPosts} key={post._id} post={post} />)
      )}
    </BaseContainer>
  );
};

export default Post;
