import React, { useState } from "react";
import { Badge } from "../../../../Components";
import { useUserContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ClassRoomInterface } from "../../../../Interfaces/index";
import { PostModuleContainer, PostText, ProfileImage, styles } from "./Styles";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
interface PostProps {
  classroom: ClassRoomInterface;
}
const Post: React.FC<PostProps> = ({ classroom }) => {
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const { userIsTeacher } = useUserContext();
  return (
    <BaseContainer backgroundColor="#d6d6d6" paddingVertical="20px">
      {userIsTeacher && (
        <PostModuleContainer
          backgroundColor="white"
          align="center"
          justify="center"
          flexDirection="column"
          height="100px"
          width="100%"
        >
          <BaseContainer flex={1} flexDirection="row" align="center">
            <ProfileImage source={{ uri: "https://imgur.com/H5PWtBp.png" }} />
            <PostText align="left" color="black">
              Escreva algo...
            </PostText>
          </BaseContainer>
          <BaseContainer
            flex={0.5}
            justify="center"
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
      {classroom.posts.length === 0 ? (
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
        classroom.posts.map((p) => (
          <BaseText key={p.content}>{p.content}</BaseText>
        ))
      )}
    </BaseContainer>
  );
};

export default Post;
