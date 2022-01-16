import { AntDesign } from "@expo/vector-icons";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { ClassroomForm, Input, WithSpinner } from "../../Components";
import ClassRoomItem from "../../Components/ClassRoomItem/ClassRoomItem.Component";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean, useModalSheetRef } from "../../Hooks";
import { ClassRoomInterface } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import { ClassroomListingSkeleton } from "../../SkeletonsLoading";
import { ClassRoomBaseContainer, styles } from "./Styles";

const ListingWithSpinner = WithSpinner<{
  classrooms: Array<ClassRoomInterface>;
  isSearchClassrooms: boolean;
}>(
  ({ classrooms, isSearchClassrooms }) => (
    <ClassRoomBaseContainer noElevation marginTop="15px">
      {classrooms.map((x) => (
        <ClassRoomItem
          key={x._id}
          classRoom={x}
          askToJoinOnPress={isSearchClassrooms}
        />
      ))}
    </ClassRoomBaseContainer>
  ),
  ClassroomListingSkeleton
);
interface ClassesApiResponse {
  classrooms: Array<ClassRoomInterface>;
}
/**
 * Class page, both childs and teachers.
 * @author andr30z
 *
 **/
const ClassRoom: React.FC = () => {
  const { height } = useWindowDimensions();
  const [classrooms, setClassrooms] = useState<Array<ClassRoomInterface>>([]);
  const { userIsTeacher, user } = useUserContext();
  const { value: isRefreshing, setTrue, setFalse } = useBoolean();
  const {
    value: isLoading,
    setTrue: setTrueIsLoading,
    setFalse: setFalseIsLoading,
  } = useBoolean();
  const [searchCode, setSearchCode] = useState("");
  const getCodeRoute = (text: string) => {
    return text ? baseApiRoutes.CLASSROOMS + "?code=" + text : undefined;
  };
  const getAllClasses = (onRefreshCallback?: () => void, route?: string) => {
    if (onRefreshCallback) setTrue();
    setTrueIsLoading();
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
      .finally(() => {
        if (onRefreshCallback) onRefreshCallback();
        setFalseIsLoading();
      });
  };
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      getAllClasses(undefined, getCodeRoute(text));
    }, 1000),
    []
  );
  const { sheetRef, close, open } = useModalSheetRef();
  useEffect(() => {
    getAllClasses();
  }, []);
  const onSuccessSaveClassroom = useCallback(() => {
    getAllClasses();
    close();
  }, [close]);
  return (
    <BaseContainer flex={1}>
      <ClassroomForm
        onSuccessSave={onSuccessSaveClassroom}
        modalSheetRef={sheetRef}
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
          <BaseText fontSize="18px">
            {userIsTeacher ? "Suas" : ""} Salas de Aula
          </BaseText>
          {userIsTeacher ? (
            <Pressable onPress={open}>
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
                  color="#f7cc7f"
                />
              }
            />
          )}
        </ClassRoomBaseContainer>
        <ListingWithSpinner
          isSearchClassrooms={searchCode.length > 0}
          isLoading={isLoading}
          classrooms={classrooms}
        />
      </ScrollView>
    </BaseContainer>
  );
};

export default ClassRoom;
