import { Feather, Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { ClassroomProvider, useClassroomContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { Members, Post } from "./Modules";

type Props = NativeStackScreenProps<
  MainStackParamList,
  ROUTES_NAME.CLASSROOM_DETAILS
>;

export const ClassroomDetails: React.FC<Props> = (props) => {
  return (
    <ClassroomProvider classId={props.route.params.classId}>
      <ClassroomDetailsInitial {...props}></ClassroomDetailsInitial>
    </ClassroomProvider>
  );
};

/**
 * Details componente of the classroom page.
 * @author andr3z0
 **/
const ClassroomDetailsInitial: React.FC<Props> = ({ navigation }) => {
  const { classroom } = useClassroomContext();
  if (!classroom) return null;
  return (
    <StickyParallaxHeader
      title={classroom.name}
      headerHeight={110}
      parallaxHeight={190}
      bounces={true}
      decelerationRate={5}
      contentContainerStyles={{
        backgroundColor: "#d6d6d6",
        paddingVertical: 50,
      }}
      foregroundImage={{ uri: classroom.classPhoto }}
      backgroundColor={classroom.color}
      headerType="TabbedHeader"
      tabs={[
        { content: <Post />, title: "Posts" },
        { content: <Members members={classroom.members} />, title: "Membros" },
      ]}
      header={() => (
        <BaseContainer
          align="center"
          flexDirection="column"
          paddingHorizontal={"20px"}
          flex={1}
          backgroundColor={classroom.color}
        >
          <BaseContainer
            align="center"
            flexDirection="row"
            justify="space-between"
            width="100%"
            flex={2}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-outline"
                size={30}
                color={classroom.textColor}
              />
            </Pressable>
            <Feather name="settings" size={30} color={classroom.textColor} />
          </BaseContainer>
          <BaseText
            style={{ flex: 1, alignSelf: "center" }}
            align="center"
            fontSize="25px"
          >
            Prof: {classroom.teacher.name}
          </BaseText>
        </BaseContainer>
      )}
    />
  );
};

export default ClassroomDetails;
