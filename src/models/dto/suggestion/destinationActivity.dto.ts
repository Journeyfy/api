import { SuggestionEnum } from "../../../enums/suggestionEnum";

export interface SuggestionDto {
  readonly id: number;
  readonly type: SuggestionEnum;
  readonly title: string;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
