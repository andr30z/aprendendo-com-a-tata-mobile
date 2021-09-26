export interface ActivityCommonProps<A> {
  activityUtterance: string;
  type:
    | "S&C"
    | "CMP"
    | "NMBSQ"
    | "NS"
    | "NO"
    | "LLI"
    | "LLCW"
    | "LLDCW"
    | "LCOT";
  stages: Array<A>;
  _id: string;
}

export interface ActivityApiResponse {
  activities: Array<ActivityCommonProps<unknown>>;
}
