import { SuggestionEnum } from "../../../enums/suggestionEnum";
import { SuggestionRequestStatusEnum } from "../../../enums/suggestionRequestStatusEnum";
import { SuggestionRequestDbo } from "../../../models/dbo/suggestionRequest.dbo";

export interface ISuggestionRequestRepository {
  getSingleAsync: (id: string) => Promise<SuggestionRequestDbo | undefined>;
  getAllAsync: () => Promise<SuggestionRequestDbo[]>;
  getAllByStatusAsync: (status: SuggestionRequestStatusEnum) => Promise<SuggestionRequestDbo[]>;
  insertAsync: (payload: SuggestionRequestDbo) => Promise<any>;
  updateAsync: (
    idRequest: string,
    status: number,
    suggestionType: SuggestionEnum,
    title: string,
    mapLink?: string,
    openAt?: string,
    closeAt?: string
  ) => Promise<any>;
}
