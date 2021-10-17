export enum UserType {
  C = "C",
  R = "R",
  P = "P",
}

export interface UserInterface {
  _id: string;
  type: UserType;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
