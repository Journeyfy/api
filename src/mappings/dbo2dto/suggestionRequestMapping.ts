import { DestinationDbo } from "../../models/dbo/destination.dbo";
import { SuggestionRequestDbo } from "../../models/dbo/suggestionRequest.dbo";
import { UserDbo } from "../../models/dbo/user.dbo";
import { SuggestionRequestDto } from "../../models/dto/suggestionRequest/suggestionRequest.dto";
import { mapUserEntityToSlimDto } from "./userMappings";

export function mapSuggestionRequestEntityToDto(
  entity: SuggestionRequestDbo,
  destination?: DestinationDbo
): SuggestionRequestDto {
  return {
    id: entity.idRequest,
    status: entity.status,
    idUser: entity.idUser,
    requestType: entity.requestType,
    suggestionType: entity.suggestionType,
    idDestination: entity.idDestination,
    destinationName: destination?.name,
    idSuggestion: entity.idSuggestion || undefined,
    title: entity.title,
    mapLink: entity.mapLink || undefined,
    openAt: entity.openAt || undefined,
    closeAt: entity.closeAt || undefined,
  };
}
