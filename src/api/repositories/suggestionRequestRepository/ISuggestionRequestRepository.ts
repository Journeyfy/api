import { SuggestionRequestDbo } from "../../../models/dbo/suggestionRequest.dbo";

export interface ISuggestionRequestRepository {
  insertAsync: (payload: SuggestionRequestDbo) => Promise<any>;
}
