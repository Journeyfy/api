import { SuggestionEnum } from "../../../enums/suggestionEnum";
import { SuggestionDbo } from "../../../models/dbo/suggestion.dbo";
import { AddSuggestionDto } from "../../../models/dto/suggestion/addSuggestion.dto";
import { UpdateSuggestionDto } from "../../../models/dto/suggestion/updateSuggestion.dto";

export interface ISuggestionRepository {
  getSingleAsync: (idSuggestion: number) => Promise<SuggestionDbo | undefined>;
  getSuggestionsForDestinationAsync: (
    idDestination: number,
    suggestionType?: SuggestionEnum
  ) => Promise<SuggestionDbo[]>;
  deleteAsync: (idSuggestion: number) => Promise<any>;
  addAsync: (payload: AddSuggestionDto) => Promise<any>;
  updateAsync: (payload: UpdateSuggestionDto) => Promise<any>;
}
