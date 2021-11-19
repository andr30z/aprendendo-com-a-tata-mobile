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
  createdAt: Date;
  updatedAt: Date;
}
