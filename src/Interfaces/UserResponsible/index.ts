import { UserInterface } from "../User";

export interface UserResponsible {
  responsibleUser: UserInterface;
  child: UserInterface;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
