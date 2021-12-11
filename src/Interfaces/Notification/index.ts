import { UserInterface } from "../User";
export enum NotificationTypes {
  ACTIVITY = 1,
  CLASS_INVITE = 2,
  NEW_POST = 3,
  USER_RESPONSIBLE_INVITE = 4,
}

export interface Notification<P = any> {
  _id: string;
  message: string;
  checked: boolean;
  payload?: P;
  type: NotificationTypes;
  user: UserInterface;
  createdAt: string;
}
