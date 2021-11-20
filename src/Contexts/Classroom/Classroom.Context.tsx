import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  ClassRoomInterface,
  SetStateInterface,
  UserType,
} from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
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
  const getClassroom = useCallback(
    (onFinishCallback?: () => void) => {
      baseApi
        .get<ClassRoomInterface>(baseApiRoutes.CLASSROOMS + "/" + classId)
        .then((res) => {
          setClassroom(res.data);
          if (onFinishCallback) onFinishCallback();
        });
    },
    [classId]
  );
  useEffect(() => {
    getClassroom();
  }, []);

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
