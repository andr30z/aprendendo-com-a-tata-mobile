export interface ActivityCommonProps<A> {
  activityUtterance: string;
  type:
    | "SC"
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
  difficulty: number;
  color?: string;
  name: string;
}

export interface ActivityApiResponse {
  activities: Array<ActivityCommonProps<unknown>>;
}
