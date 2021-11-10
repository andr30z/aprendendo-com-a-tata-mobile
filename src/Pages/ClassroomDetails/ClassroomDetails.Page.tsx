import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, Animated, Pressable } from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Badge } from "../../Components";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { Members, Post } from "./Modules";
import { ClassRoomInterface } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";

type Props = NativeStackScreenProps<MainStackParamList, "CLASSROOM_DETAILS">;

/**
 * Details componente of the classroom page.
 * @author andr3z0
 **/
const ClassroomDetails: React.FC<Props> = ({ navigation, route }) => {
  const [classroom, setClassroom] = useState<ClassRoomInterface>();
  useEffect(() => {
    baseApi
      .get<ClassRoomInterface>(
        baseApiRoutes.CLASSROOMS + "/" + route.params.classId
      )
      .then((res) => {
        setClassroom(res.data);
      });
  }, []);
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
        { content: <Post classroom={classroom} />, title: "Posts" },
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
