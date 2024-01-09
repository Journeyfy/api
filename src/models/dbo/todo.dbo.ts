import { BaseDbo } from "./base.dbo";

export interface DestinationTodoDbo extends BaseDbo {
  readonly idTodo: number;
  readonly idDestination: number;
  readonly type: number;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
