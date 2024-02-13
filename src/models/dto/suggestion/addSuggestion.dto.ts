import { SuggestionEnum } from "../../../enums/suggestionEnum";

export interface AddSuggestionDto {
  readonly idDestination: number;
  readonly type: SuggestionEnum;
  readonly title: string;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
