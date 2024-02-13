import { SuggestionRequestStatusEnum } from "../../../enums/suggestionRequestStatusEnum";
import { SuggestionRequestDbo } from "../../../models/dbo/suggestionRequest.dbo";
import { SuggestionRequestDto } from "../../../models/dto/suggestionRequest/suggestionRequest.dto";
import { UpdateDestinationSuggestionRequestRequestType } from "../../schemas/suggestion/requests/updateDestinationSuggestionRequest";

export interface ISuggestionRequestService {
  getSuggestionRequests: (
    status?: SuggestionRequestStatusEnum
  ) => Promise<SuggestionRequestDto[]>;
  updateSuggestionRequest: (
    payload: UpdateDestinationSuggestionRequestRequestType,
    toUpdateRequest: SuggestionRequestDbo
  ) => Promise<boolean>;
}
