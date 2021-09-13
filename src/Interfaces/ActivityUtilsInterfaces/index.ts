export interface ActivityCommonProps<A> {
  activityUtterance: string;
  type: "S&C" | "CMP" | "NMBSQ" | "NS" | "LLI";
  stages: Array<A>;
  _id: string;
}
