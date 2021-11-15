import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PostItem } from "../../Components";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBackHandler } from "../../Hooks";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
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
  console.log(navigation.isFocused())
  useBackHandler(undefined, () => {
    // console.log(navigation)
    if (navigation.isFocused()) navigation.goBack();
    return undefined;
  });
  return (
    <PostDetailsScrollView>
      <PostItem
        primaryTheme={primaryTheme}
        textTheme={textTheme}
        post={post}
        isRenderedInPostDetailsPage
      />
    </PostDetailsScrollView>
  );
};

export default PostDetails;
