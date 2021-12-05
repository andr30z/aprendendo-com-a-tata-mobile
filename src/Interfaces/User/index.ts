import { FileType } from "../CommonInterfaces";

export enum UserType {
  C = "C",
  R = "R",
  T = "T",
}

export interface UserInterface {
  _id: string;
  type: UserType;
  email: string;
  name: string;
  profilePhoto?: FileType;
  code: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
}
