export interface Teacher {
  name: string;
}

export interface Member {}

export interface ClassRoomInterface {
  _id: string;
  teacher: Teacher;
  name: string;
  description?: string;
  members: Member[];
  code: string;
  color: string;
  tags: Array<string>;
  textColor?: string;
}
