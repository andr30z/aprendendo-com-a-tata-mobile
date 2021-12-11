export * from "./ActivityUtilsInterfaces";
export * from "./StylesInterfaces";
export * from "./Utility";
export * from "./User";
export * from "./NavigationInterfaces";
export * from "./ClassRoom";
export * from "./CommonInterfaces";
export * from "./UserResponsible";


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
  