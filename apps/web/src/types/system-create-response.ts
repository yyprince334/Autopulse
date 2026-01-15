import { System } from "./system";

export type CreateSystemResponse = System & {
  apiKey: string;
};