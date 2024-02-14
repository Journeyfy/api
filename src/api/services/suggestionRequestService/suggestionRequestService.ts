import _ from "lodash";
import { SuggestionRequestDbo } from "../../../models/dbo/suggestionRequest.dbo";
import { ISuggestionRequestRepository } from "../../repositories/suggestionRequestRepository/ISuggestionRequestRepository";
import { IUserRepository } from "../../repositories/userRepository/IUserRepository";
import { mapSuggestionRequestEntityToDto } from "../../../mappings/dbo2dto/suggestionRequestMapping";
import { SuggestionRequestStatusEnum } from "../../../enums/suggestionRequestStatusEnum";
import { UpdateDestinationSuggestionRequestRequestType } from "../../schemas/suggestion/requests/updateDestinationSuggestionRequest";
import { ISuggestionRepository } from "../../repositories/suggestionRepository/ISuggestionRepository";
import { AddSuggestionDto } from "../../../models/dto/suggestion/addSuggestion.dto";
import { SuggestionRequestEnum } from "../../../enums/suggestionRequestEnum";
import { IDestinationRepository } from "../../repositories/destinationRepository/IDestinationRepository";
import { SuggestionRequestDto } from "../../../models/dto/suggestionRequest/suggestionRequest.dto";

const suggestionRequestService = (
  suggestionRequestRepository: ISuggestionRequestRepository,
  suggestionRepository: ISuggestionRepository,
  destinationRepository: IDestinationRepository
) => {
  return {
    getSuggestionRequests: async (status?: SuggestionRequestStatusEnum) => {
      const suggestionRequests = status
        ? await suggestionRequestRepository.getAllByStatusAsync(status)
        : await suggestionRequestRepository.getAllAsync();

      const result: SuggestionRequestDto[] = [];
      await Promise.all(
        suggestionRequests.map(async (req) => {
          const res = await destinationRepository.getByIdAsync(req.idDestination);
          result.push(mapSuggestionRequestEntityToDto(req, res));
        })
      );

      return result;
    },
    updateSuggestionRequest: async (
      payload: UpdateDestinationSuggestionRequestRequestType,
      toUpdateRequest: SuggestionRequestDbo
    ) => {
      await suggestionRequestRepository.updateAsync(
        payload.idRequest,
        payload.status || toUpdateRequest.status,
        toUpdateRequest.suggestionType,
        payload.title || toUpdateRequest.title,
        payload.mapLink || toUpdateRequest.mapLink!,
        payload.openAt || toUpdateRequest.openAt!,
        payload.closeAt || toUpdateRequest.closeAt!
      );

      if (payload.status === SuggestionRequestStatusEnum.Released) {
        if (toUpdateRequest.requestType === SuggestionRequestEnum.Delete) {
          await suggestionRepository.deleteAsync(toUpdateRequest.idSuggestion!);
        } else {
          const suggestionPayload: AddSuggestionDto = {
            idDestination: toUpdateRequest.idDestination,
            type: toUpdateRequest.suggestionType,
            title: payload.title || toUpdateRequest.title,
            mapLink: payload.mapLink || toUpdateRequest.mapLink!,
            openAt: payload.openAt || toUpdateRequest.openAt!,
            closeAt: payload.closeAt || toUpdateRequest.closeAt!,
          };
          toUpdateRequest.idSuggestion
            ? await suggestionRepository.updateAsync({
                idSuggestion: toUpdateRequest.idSuggestion,
                ...suggestionPayload,
              })
            : await suggestionRepository.addAsync(suggestionPayload);
        }
      }
      return true;
    },
  };
};

export default suggestionRequestService;
