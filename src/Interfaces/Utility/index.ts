import { Dispatch, SetStateAction } from "react";

export type SetStateInterface<S> = Dispatch<SetStateAction<S>>;

export interface PaginationInterface<P> {
  results: Array<P>;
  currentPage: number;
  nextPage: number;
  total: number;
  lastPage: number;
}
