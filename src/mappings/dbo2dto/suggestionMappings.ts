import { SuggestionDbo } from "../../models/dbo/suggestion.dbo";
import { SuggestionDto } from "../../models/dto/suggestion/destinationActivity.dto";

export function mapSuggestionEntityToDto(
  entity: SuggestionDbo
): SuggestionDto {
  return {
    id: entity.idSuggestion,
    type: entity.type,
    title: entity.title,
    mapLink: entity.mapLink,
    openAt: entity.openAt,
    closeAt: entity.closeAt,
  };
}
