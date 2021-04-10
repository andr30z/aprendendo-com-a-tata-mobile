export interface ActivityListProps {
  activities: Array<ActivityGroup>;
}

export interface ActivityGroup {
  level: number;
  name: string;
  description: string;
  activities: Array<ActivityItem>;
}

export interface ActivityItem {
  name: string;
  level: number;
  description: string;
}
