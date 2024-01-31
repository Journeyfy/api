import { SuggestionRequestStatusEnum } from "../../../enums/suggestionRequestStatusEnum";
import { SuggestionRequestDto } from "../../../models/dto/suggestionRequest/suggestionRequest.dto";

export interface ISuggestionRequestService {
  getSuggestionRequests: (
    status?: SuggestionRequestStatusEnum
  ) => Promise<SuggestionRequestDto[]>;
}
