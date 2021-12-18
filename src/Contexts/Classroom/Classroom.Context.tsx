import { useNavigation } from "@react-navigation/core";
import React, {
  createContext, useCallback, useContext,
  useEffect,
  useState
} from "react";
import Toast from "react-native-toast-message";
import {
  ClassRoomInterface,
  SetStateInterface
} from "../../Interfaces/index";
import { ROUTES_NAME } from "../../Routes/MainBottom/RoutesName";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";
import { useUserContext } from "../User/User.Context";
type ClassRoomComposition = ClassRoomInterface | null;
interface ClassroomContextInterface {
  classroom: ClassRoomComposition;
  setClassroom: SetStateInterface<ClassRoomComposition>;
  getClassroom: (onFinishCallback?: () => void) => void;
}

const ClassroomContext = createContext<ClassroomContextInterface>(
  {} as ClassroomContextInterface
);

export const ClassroomProvider: React.FC<{ classId: string }> = ({
  children,
  classId,
}) => {
  const [classroom, setClassroom] = useState<ClassRoomComposition>(null);
  const { user } = useUserContext();
  const navigation = useNavigation();
  const getClassroom = useCallback(
    (onFinishCallback?: () => void) => {
      baseApi
        .get<ClassRoomInterface>(baseApiRoutes.CLASSROOMS + "/" + classId)
        .then((res) => {
          setClassroom(res.data);
          if (onFinishCallback) onFinishCallback();
        })
        .catch((e) => {
          const parent = navigation.getParent();
          if (parent) parent.navigate(ROUTES_NAME.CLASS_ROOM);
          showError(e);
        });
    },
    [classId]
  );

  useEffect(() => {
    getClassroom();
  }, []);

  useEffect(() => {
    if (!classroom) return;
    if (
      classroom.teacher._id === user?._id ||
      classroom.members.find((x) => x._id === user?._id)
    )
      return;
    Toast.show({ type: "error", text1: "Você não faz parte dessa sala." });
    navigation.goBack();
  }, [classroom, user]);

  return (
    <ClassroomContext.Provider
      value={{
        classroom,
        setClassroom,
        getClassroom,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};

export function useClassroomContext() {
  const { classroom, setClassroom, getClassroom } =
    useContext(ClassroomContext);
  const primaryTheme = classroom?.color;
  const textTheme = classroom?.textColor;

  return {
    classroom,
    setClassroom,
    primaryTheme,
    textTheme,
    getClassroom,
  };
}
