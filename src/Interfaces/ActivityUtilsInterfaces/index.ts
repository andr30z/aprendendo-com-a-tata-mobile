export interface ActivityCommonProps<A> {
  activityUtterance: string;
  type: "S&C" | "CMP" | "NMBSQ" | "NS";
  stages: Array<A>;
  _id: string;
}
