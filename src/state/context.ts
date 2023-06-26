import { Patient } from "../types";

export type State = {
  patients: { [id: string]: Patient | undefined };
};
