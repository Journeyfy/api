import { BaseDbo } from "./base.dbo";

export interface SuggestionDbo extends BaseDbo {
  readonly idSuggestion: number;
  readonly idDestination: number;
  readonly type: number;
  readonly title: string;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
