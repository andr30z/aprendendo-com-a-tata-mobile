export interface ActivityCommonProps<A> {
  activityUtterance: string;
  type: "S&C" | "CMP";
  stages: Array<A>;
  _id: string;
}
