import React, { createContext, useContext, useEffect, useState } from "react";
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
}

const ClassroomContext = createContext<ClassroomContextInterface>(
  {} as ClassroomContextInterface
);

export const ClassroomProvider: React.FC<{ classId: string }> = ({
  children,
  classId,
}) => {
  const [classroom, setClassroom] = useState<ClassRoomComposition>(null);
  useEffect(() => {
    baseApi
      .get<ClassRoomInterface>(baseApiRoutes.CLASSROOMS + "/" + classId)
      .then((res) => {
        setClassroom(res.data);
      });
  }, []);

  return (
    <ClassroomContext.Provider
      value={{
        classroom,
        setClassroom,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};

export function useClassroomContext() {
  const { classroom, setClassroom } = useContext(ClassroomContext);
  const primaryTheme = classroom?.color;
  const textTheme = classroom?.textColor;

  return {
    classroom,
    setClassroom,
    primaryTheme,
    textTheme,
  };
}
