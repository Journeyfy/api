import { SuggestionEnum } from "../../../enums/suggestionEnum";
import { SuggestionRequestEnum } from "../../../enums/suggestionRequestEnum";
import { SuggestionRequestStatusEnum } from "../../../enums/suggestionRequestStatusEnum";
import { SlimUserDto } from "../user/slimUser.dto";

export interface SuggestionRequestDto {
  readonly id: string;
  readonly status: SuggestionRequestStatusEnum;
  readonly idUser: string;
  readonly requestType: SuggestionRequestEnum;
  readonly suggestionType: SuggestionEnum;
  readonly idSuggestion?: number;
  readonly title: string;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
