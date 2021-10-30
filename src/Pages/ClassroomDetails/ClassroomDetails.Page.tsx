import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
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

type Props = NativeStackScreenProps<MainStackParamList, "CLASSROOM_DETAILS">;
const classRoom: ClassRoomInterface = {
  _id: "1",
  teacher: { name: "André" },
  tags: ["Leitura", "Números"],
  name: "Sala 1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  code: "123123123",
  color: "#8078cc",
  textColor: "#fff",
  posts: [
    {
      _id: "123",
      activities: [],
      author: {
        _id: "6148afdf043c9d06cdc1bcce",
        type: "C",
        email: "eitaporra@mail.com",
        name: "André Luiz",
      } as  any,
      allowComments:true,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis lectus nulla. Pretium lectus quam id leo in vitae turpis massa. Enim ut sem viverra aliquet eget sit amet tellus. Orci eu lobortis elementum nibh tellus molestie. Rhoncus mattis rhoncus urna neque. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Elit duis tristique sollicitudin nibh sit amet commodo nulla. Semper quis lectus nulla at volutpat diam.",
      postLikes:[]
    },
  ],
  members: [
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
    {
      _id: "6148afdf043c9d06cdc1bcce",
      type: "C",
      email: "eitaporra@mail.com",
      name: "André Luiz",
    },
  ] as any,
};

/**
 * Details componente of the classroom page.
 * @author andr3z0
 **/
const ClassroomDetails: React.FC<Props> = ({ navigation }) => {
  return (
    <StickyParallaxHeader
      title={classRoom.name}
      headerHeight={110}
      parallaxHeight={190}
      bounces={true}
      decelerationRate={5}
      contentContainerStyles={{
        backgroundColor: "#d6d6d6",
        paddingVertical: 50,
      }}
      foregroundImage={{ uri: "https://imgur.com/H5PWtBp.png" }}
      backgroundColor={classRoom.color}
      headerType="TabbedHeader"
      tabs={[
        { content: <Post classroom={classRoom} />, title: "Posts" },
        { content: <Members members={classRoom.members} />, title: "Membros" },
      ]}
      header={() => (
        <BaseContainer
          align="center"
          flexDirection="column"
          paddingHorizontal={"20px"}
          flex={1}
          backgroundColor={classRoom.color}
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
                color={classRoom.textColor}
              />
            </Pressable>
            <Feather name="settings" size={30} color={classRoom.textColor} />
          </BaseContainer>
          <BaseText
            style={{ flex: 1, alignSelf: "center" }}
            align="center"
            fontSize="25px"
          >
            Prof: {classRoom.teacher.name}
          </BaseText>
        </BaseContainer>
      )}
    />
  );
};

export default ClassroomDetails;
