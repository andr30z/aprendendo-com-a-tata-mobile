import { Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef } from "react";
import { Pressable, RefreshControl } from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { ClassroomForm, ConfirmationModal } from "../../Components";
import {
  ClassroomProvider,
  useClassroomContext,
  useUserContext,
} from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean, useModalSheetRef } from "../../Hooks";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { formatFilePathUrl } from "../../Utils";
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
  const { classroom, getClassroom, textTheme, primaryTheme } =
    useClassroomContext();
  const { close, open, sheetRef } = useModalSheetRef();
  const classroomEditObject = useMemo(
    () => ({
      ...classroom,
      devicePhotoURI: "",
      teacherId: classroom?.teacher._id,
      classPhoto: classroom?.classPhoto?.path || "",
    }),
    [classroom]
  );
  const { userIsTeacher } = useUserContext();
  const { value: isRefreshing, setTrue, setFalse } = useBoolean();
  const onSuccessSaveCallback = useCallback(() => {
    getClassroom();
    close();
  }, [getClassroom]);
  const exitClassroom = useCallback(async () => {}, [classroom]);
  const onDelete = useCallback(() => navigation.goBack(), []);
  if (!classroom) return null;
  return (
    <StickyParallaxHeader
      title={classroom.name}
      headerHeight={110}
      parallaxHeight={190}
      bounces={true}
      decelerationRate={5}
      refreshControl={
        <RefreshControl
          colors={[primaryTheme] as any}
          refreshing={isRefreshing}
          onRefresh={() => {
            setTrue();
            getClassroom(setFalse);
          }}
        />
      }
      contentContainerStyles={{
        backgroundColor: "#d6d6d6",
        paddingVertical: 50,
      }}
      foregroundImage={{
        uri: formatFilePathUrl(classroom.classPhoto?.path),
      }}
      backgroundColor={classroom.color}
      headerType="TabbedHeader"
      tabTextActiveStyle={{
        backgroundColor: textTheme,
        color: primaryTheme,
        borderRadius: 20,
      }}
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
            {userIsTeacher ? (
              <Feather
                onPress={open}
                name="settings"
                size={30}
                color={classroom.textColor}
              />
            ) : (
              <Ionicons
                name="md-exit-outline"
                size={30}
                onPress={open}
                color={classroom.textColor}
              />
            )}
          </BaseContainer>
          <BaseText
            style={{ flex: 1, alignSelf: "center" }}
            align="center"
            fontSize="25px"
          >
            Prof: {classroom.teacher.name}
          </BaseText>
          {userIsTeacher ? (
            <ClassroomForm
              classroom={classroomEditObject as any}
              onSuccessSave={onSuccessSaveCallback}
              modalSheetRef={sheetRef}
              onSuccessDelete={onDelete}
            />
          ) : (
            <ConfirmationModal
              modalRef={sheetRef}
              confirmationQuestion="Deseja realmente sair da classe?"
              onConfirm={exitClassroom}
            />
          )}
        </BaseContainer>
      )}
    />
  );
};

export default ClassroomDetails;
