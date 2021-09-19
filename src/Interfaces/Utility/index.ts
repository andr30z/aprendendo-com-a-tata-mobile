import { Dispatch, SetStateAction } from "react";

export type SetStateInterface<S> = Dispatch<SetStateAction<S>>;
