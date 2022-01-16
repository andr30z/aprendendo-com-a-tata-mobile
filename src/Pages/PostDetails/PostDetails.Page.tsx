import { useIsFocused } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { PostItem } from "../../Components";
import { useBackHandler } from "../../Hooks";
import { Post } from "../../Interfaces/index";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { baseApi, baseApiRoutes } from "../../Services";
import { PostDetailsScrollView } from "./Styles";

type Props = NativeStackScreenProps<
  MainStackParamList,
  ROUTES_NAME.POST_DETAILS
>;
/**
 * Post Details
 * @author andr30z
 **/
const PostDetails: React.FC<Props> = ({ navigation, route }) => {
  const {
    params: { post, primaryTheme, textTheme, classroom },
  } = route;
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const isFocused = useIsFocused();
  const getPost = useCallback(() => {
    baseApi.get<Post>(baseApiRoutes.POSTS + "/" + post._id).then((res) => {
      setCurrentPost(res.data);
    });
  }, [post]);

  useEffect(() => {
    getPost();
  }, [isFocused]);
  useBackHandler(undefined, () => {
    navigation.goBack();
    return true;
  });
  return (
    <PostDetailsScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <PostItem
        classroom={classroom}
        primaryTheme={primaryTheme}
        textTheme={textTheme}
        post={currentPost || post}
        isRenderedInPostDetailsPage
        getPosts={getPost}
      />
    </PostDetailsScrollView>
  );
};

export default PostDetails;
