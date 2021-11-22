import {
  Feather,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo } from "react";
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
import { JoinRequests, Members, Post } from "./Modules";
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
  const tabs = useMemo(() => {
    const pendingJoinRequests = userIsTeacher
      ? [
          {
            content: (
              <JoinRequests
                pendingJoinRequests={classroom?.pendingJoinRequests as any}
              />
            ),
            title: "Pedidos",
            icon: (isActive: boolean) => (
              <BaseContainer flex={1} position="relative">
                <MaterialIcons
                  name="notifications-on"
                  size={22}
                  style={{
                    marginRight: 0,
                    marginLeft: 5,
                  }}
                  color={isActive ? primaryTheme : textTheme}
                />
                {classroom?.pendingJoinRequests &&
                  classroom.pendingJoinRequests.length > 0 && (
                    <AntDesign
                      style={{ position: "absolute", top: -3, right: -3 }}
                      name="star"
                      size={13}
                      color="#ff333d"
                    />
                  )}
              </BaseContainer>
            ),
          },
        ]
      : [];
    return [
      { content: <Post />, title: "Posts" },
      {
        content: <Members members={classroom?.members as any} />,
        title: "Membros",
      },
      ...pendingJoinRequests,
    ];
  }, [classroom, classroom, userIsTeacher]);
  if (!classroom) return null;
  return (
    <StickyParallaxHeader
      title={classroom.name}
      headerHeight={110}
      parallaxHeight={200}
      bounces={true}
      titleStyle={{ fontSize: 37, color: textTheme, fontWeight: "900" }}
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
      tabTextContainerActiveStyle={{ backgroundColor: textTheme }}
      tabs={tabs}
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
                color={textTheme}
              />
            </Pressable>
            {userIsTeacher ? (
              <Feather
                onPress={open}
                name="settings"
                size={30}
                color={textTheme}
              />
            ) : (
              <Ionicons
                name="md-exit-outline"
                size={30}
                onPress={open}
                color={textTheme}
              />
            )}
          </BaseContainer>
          <BaseText
            style={{ flex: 1, alignSelf: "center" }}
            align="center"
            fontSize="25px"
            color={textTheme}
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
