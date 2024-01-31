import _ from "lodash";
import { SuggestionRequestDbo } from "../../../models/dbo/suggestionRequest.dbo";
import { ISuggestionRequestRepository } from "../../repositories/suggestionRequestRepository/ISuggestionRequestRepository";
import { IUserRepository } from "../../repositories/userRepository/IUserRepository";
import { mapSuggestionRequestEntityToDto } from "../../../mappings/dbo2dto/suggestionRequestMapping";
import { SuggestionRequestStatusEnum } from "../../../enums/suggestionRequestStatusEnum";

const suggestionRequestService = (
  suggestionRequestRepository: ISuggestionRequestRepository
) => {
  return {
    getSuggestionRequests: async (status?: SuggestionRequestStatusEnum) => {
      let suggestionRequests = status
        ? await suggestionRequestRepository.getAllByStatusAsync(status)
        : await suggestionRequestRepository.getAllAsync();

      return _.map(suggestionRequests, mapSuggestionRequestEntityToDto);
    },
  };
};

export default suggestionRequestService;
