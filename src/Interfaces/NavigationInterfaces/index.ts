export interface RoutesListType<T> {
  [x: string]: T;
}

export type KeyOfNavigationList<T> = keyof T;
