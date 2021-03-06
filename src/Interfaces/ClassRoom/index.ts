import { FileType } from "../CommonInterfaces";
import { ActivityCommonProps } from "../ActivityUtilsInterfaces";
import { UserInterface } from "../User";

export interface Teacher extends UserInterface {}

export interface PostLikesItemInterface {
  _id: string;
  user: UserInterface;
}

export enum PostTypes {
  A = "A",
  N = "N",
}

export interface Member extends UserInterface {}

export interface ActivityAnswers {
  _id: string;
  activity: Array<any>;
}
export interface ActivityResult<A = unknown> {
  _id: string;
  user: UserInterface;
  finished: boolean;
  activity: Omit<ActivityCommonProps<A>, "stages" | "activityUtterance">;
  result: number;
  createdAt: string;
  activityAnswers: Array<ActivityAnswers>;
}
export interface PostActivityResult {
  _id: string;
  activitiesResult: Array<ActivityResult>;
  user: UserInterface;
}
export interface Post {
  _id: string;
  text: string;
  author: UserInterface;
  allowComments: boolean;
  activities?: Array<ActivityCommonProps<unknown>>;
  postActivityResult?: Array<PostActivityResult>;
  postLikes: Array<PostLikesItemInterface>;
  createdAt: string;
  type: PostTypes;
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
  pendingJoinRequests: Array<UserInterface>;
  classPhoto?: FileType;
  textColor?: string;
}
