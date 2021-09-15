export interface ActivityCommonProps<A> {
  activityUtterance: string;
  type: "S&C" | "CMP" | "NMBSQ" | "NS" | "LLI" | "LLCW" | "LLDCW" | "LCOT";
  stages: Array<A>;
  _id: string;
}
