import React, { useEffect, useState, useRef, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Pressable,
  RefreshControl,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { ClassroomForm, Input } from "../../Components";
import ClassRoomItem from "../../Components/ClassRoomItem/ClassRoomItem.Component";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean } from "../../Hooks";
import { ClassRoomInterface } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import { ClassRoomBaseContainer, styles } from "./Styles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { debounce } from "lodash";
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
  const { value: isRefreshing, setTrue, setFalse } = useBoolean();
  const [searchCode, setSearchCode] = useState("");
  const getCodeRoute = (text: string) => {
    return text ? baseApiRoutes.CLASSROOMS + "?code=" + text : undefined;
  };
  const getAllClasses = (onRefreshCallback?: () => void, route?: string) => {
    if (onRefreshCallback) setTrue();
    baseApi
      .get<ClassesApiResponse>(
        route ||
          baseApiRoutes.CLASSES_BY_USERS +
            `/${user?._id}?isTeacher=${userIsTeacher}`
      )
      .then((res) => {
        setClassrooms(res.data.classrooms);
      })
      .catch((e) => console.log(e))
      .finally(() => onRefreshCallback && onRefreshCallback());
  };
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      getAllClasses(undefined, getCodeRoute(text));
    }, 1000),
    []
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  useEffect(() => {
    getAllClasses();
  }, []);
  return (
    <BaseContainer flex={1}>
      <ClassroomForm
        onSuccessSave={() => {
          getAllClasses();
          bottomSheetRef.current?.close();
        }}
        modalSheetRef={bottomSheetRef}
      />
      <ScrollView
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            colors={["#8078cc"]}
            refreshing={isRefreshing}
            onRefresh={() => getAllClasses(setFalse, getCodeRoute(searchCode))}
          />
        }
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
          <BaseText fontSize="18px">{userIsTeacher ? "Suas" : ""} Salas de Aula</BaseText>

          {userIsTeacher ? (
            <Pressable onPress={() => bottomSheetRef.current?.present()}>
              <AntDesign
                style={{ backgroundColor: "white", borderRadius: 15 }}
                name="plus"
                size={30}
                color="#f7cc7f"
              />
            </Pressable>
          ) : (
            <Input
              withWrapper
              inputHeight="27px"
              inputWidth="40%"
              placeholder="Código"
              value={searchCode}
              onChangeText={(text) => {
                setSearchCode(text);
                debouncedSearch(text);
              }}
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
          )}
        </ClassRoomBaseContainer>
        <ClassRoomBaseContainer noElevation marginTop="15px">
          {classrooms.map((x) => (
            <ClassRoomItem key={x._id} classRoom={x} />
          ))}
        </ClassRoomBaseContainer>
      </ScrollView>
    </BaseContainer>
  );
};

export default ClassRoom;
