import React from "react";
import { useWindowDimensions } from "react-native";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean } from "../../Hooks";
import { Post } from "../../Interfaces/index";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import {
  PostFooterContainer,
  PostItemContainer,
  styles,
  TextPostContainer,
} from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import ReadMore  from '@fawazahmed/react-native-read-more';
interface PostItemProps {
  post: Post;
}

/**
 * Post item listing component.
 * @author andr3z0
 **/
const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { height } = useWindowDimensions();
  return (
    <PostItemContainer deviceHeight={height}>
      <BaseContainer flexDirection="row" align="center" justify="space-between">
        <BaseContainer  align="center" flexDirection="row">
          <ProfilePhoto
            size={40}
            source={{ uri: "https://imgur.com/H5PWtBp.png" }}
          />
          <BaseText marginLeft="13px" color="black">
            {post.author.name}
          </BaseText>
        </BaseContainer>
        <Entypo name="dots-three-horizontal" size={20} color="#c3c3c3" />
      </BaseContainer>
      <TextPostContainer>
        <ReadMore numberOfLines={4} seeLessText="Ver menos" seeMoreText="Ver mais" >
          {post.text}
        </ReadMore >
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
