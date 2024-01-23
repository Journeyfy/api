import { SuggestionEnum } from "../../../enums/suggestion.enum";
import { SuggestionDbo } from "../../../models/dbo/suggestion.dbo";

export interface ISuggestionRepository {
  getSuggestionsForDestinationAsync: (
    idDestination: number,
    suggestionType?: SuggestionEnum
  ) => Promise<SuggestionDbo[]>;
}
