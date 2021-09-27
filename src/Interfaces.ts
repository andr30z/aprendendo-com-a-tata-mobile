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
  dificulty: number;
  description: string;
  tags: Array<string>;
}
