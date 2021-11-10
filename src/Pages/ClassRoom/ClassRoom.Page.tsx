import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "../../Components";
import ClassRoomItem from "../../Components/ClassRoomItem/ClassRoomItem.Component";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { ClassRoomInterface, UserType } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import { ClassRoomBaseContainer, styles } from "./Styles";
interface ClassesApiResponse {
  classrooms: Array<ClassRoomInterface>;
}
/**
 * Class page, both childs and teachers.
 * @author andr3z0
 *
 **/
const ClassRoom: React.FC = () => {
  const { height } = useWindowDimensions();
  const [classrooms, setClassrooms] = useState<Array<ClassRoomInterface>>([]);
  const { userIsTeacher, user } = useUserContext();
  useEffect(() => {
    baseApi
      .get<ClassesApiResponse>(
        baseApiRoutes.CLASSES_BY_USERS +
          `/${user?._id}?isTeacher=${userIsTeacher}`
      )
      .then((res) => {
        console.log(res.data)
        setClassrooms(res.data.classrooms);
      });
  }, []);
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
        {classrooms.map((x) => (
          <ClassRoomItem key={x._id} classRoom={x} />
        ))}
      </ClassRoomBaseContainer>
    </ScrollView>
  );
};

export default ClassRoom;
