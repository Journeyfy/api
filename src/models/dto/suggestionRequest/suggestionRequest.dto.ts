import { SuggestionEnum } from "../../../enums/suggestionEnum";
import { SuggestionRequestEnum } from "../../../enums/suggestionRequestEnum";
import { SuggestionRequestStatusEnum } from "../../../enums/suggestionRequestStatusEnum";

export interface SuggestionRequestDto {
  readonly id: string;
  readonly status: SuggestionRequestStatusEnum;
  readonly idUser: string;
  readonly requestType: SuggestionRequestEnum;
  readonly suggestionType: SuggestionEnum;
  readonly idDestination: number;
  readonly destinationName?: string;
  readonly idSuggestion?: number;
  readonly title: string;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
