import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "../../Components";
import ClassRoomItem from "../../Components/ClassRoomItem/ClassRoomItem.Component";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { ClassRoomInterface, UserType } from "../../Interfaces/index";
import { ClassRoomBaseContainer, styles } from "./Styles";
const CLASSROOMLISTING: Array<ClassRoomInterface> = [
  {
    _id: "1",
    teacher: { name: "André" },
    tags: ["Leitura", "Números"],
    name: "Sala 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    members: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    code: "123123123",
    color: "#8078cc",
    textColor: "white",
  },
  {
    _id: "2",
    teacher: { name: "André" },
    name: "Sala 2",
    tags: ["Leitura", "Números"],
    description:
      "Sed nec venenatis tortor, at ultricies elit. Aliquam interdum id lacus sed bibendum. ",
    members: [{}, {}, {}, {}, {}, {}],
    code: "123123123",
    color: "#f7cc7f",
  },
  {
    _id: "3",
    tags: ["Leitura", "Números"],
    teacher: { name: "André" },
    name: "Sala 3",
    description:
      "Sed nec venenatis tortor, at ultricies elit. Aliquam interdum id lacus sed bibendum. ",
    members: [{}, {}, {}],
    code: "123123123",
    color: "red",
  },
  {
    _id: "4",
    tags: ["Leitura", "Números"],
    teacher: { name: "André" },
    name: "Sala 4",
    description:
      "Sed nec venenatis tortor, at ultricies elit. Aliquam interdum id lacus sed bibendum. ",
    members: [{}, {}, {}, {}, {}],
    code: "123123123",
    color: "#f7cc7f",
  },
];

/**
 * Class page, both childs and teachers.
 * @author andr3z0
 *
 **/
const ClassRoom: React.FC = () => {
  const { height } = useWindowDimensions();
  const { userIsTeacher } = useUserContext();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: height * 0.3 }}
      style={styles.scrollContainerStyles}
    >
      <ClassRoomBaseContainer
        width="100%"
        height={"70px"}
        backgroundColor="#8078cc"
        flexDirection="row"
        align="center"
        justify="space-evenly"
      >
        <BaseText>Suas Salas de Aula</BaseText>
        <Input
          withWrapper
          inputHeight="27px"
          inputWidth="40%"
          wrapperStyles={styles.inputWrapperStyles}
          style={styles.inputBaseStyles}
          appendComponent={
            <AntDesign
              style={styles.inputSearchAppendStyles}
              name="search1"
              size={15}
              color="#8078cc"
            />
          }
        />
        {userIsTeacher && (
          <Pressable onPress={() => null}>
            <AntDesign name="plus" size={25} color="#f7cc7f" />
          </Pressable>
        )}
      </ClassRoomBaseContainer>
      <ClassRoomBaseContainer noElevation marginTop="15px">
        {CLASSROOMLISTING.map((x) => (
          <ClassRoomItem key={x._id} classRoom={x} />
        ))}
      </ClassRoomBaseContainer>
    </ScrollView>
  );
};

export default ClassRoom;
