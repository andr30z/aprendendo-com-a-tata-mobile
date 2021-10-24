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
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}
