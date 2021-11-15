import { useIsFocused } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
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
 * @author andr3z0
 **/
const PostDetails: React.FC<Props> = ({ navigation, route }) => {
  const {
    params: { post, primaryTheme, textTheme },
  } = route;
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  useEffect(() => {
    baseApi.get<Post>(baseApiRoutes.POSTS + "/" + post._id).then((res) => {
      console.log(res.data);
      setCurrentPost(res.data);
    });
  }, []);
  const focused = useIsFocused();
  console.log(focused, "focused");
  useBackHandler(undefined, () => {
    navigation.goBack();
    return true;
  });
  return (
    <PostDetailsScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <PostItem
        primaryTheme={primaryTheme}
        textTheme={textTheme}
        post={currentPost || post}
        isRenderedInPostDetailsPage
      />
    </PostDetailsScrollView>
  );
};

export default PostDetails;
