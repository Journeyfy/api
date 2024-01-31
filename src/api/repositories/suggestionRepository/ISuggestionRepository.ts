import { SuggestionEnum } from "../../../enums/suggestionEnum";
import { SuggestionDbo } from "../../../models/dbo/suggestion.dbo";

export interface ISuggestionRepository {
  getSingleAsync: (idSuggestion: number) => Promise<SuggestionDbo | undefined>;
  getSuggestionsForDestinationAsync: (
    idDestination: number,
    suggestionType?: SuggestionEnum
  ) => Promise<SuggestionDbo[]>;
  deleteAsync: (idSuggestion: number) => Promise<any>;
}
