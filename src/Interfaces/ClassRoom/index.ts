import { UserInterface } from "../User";

export interface Teacher {
  name: string;
}

export interface Member extends UserInterface {}
export interface Post {
  content: string;
  author: UserInterface;
}

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
  posts: Array<Post>;
}
