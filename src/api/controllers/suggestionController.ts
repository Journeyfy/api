import { FastifyInstance } from "fastify";
import { Routes } from "../../enums/routes";
import { mapSuggestionEntityToDto } from "../../mappings/dbo2dto/suggestionMappings";
import { SuggestionDto } from "../../models/dto/suggestion/destinationActivity.dto";
import {
  GetDestinationSuggestionsRequest,
  GetDestinationSuggestionsRequestType,
} from "../schemas/suggestion/requests/getDestinationSuggestions";
import _ from "lodash";

const suggestionController = async (fastify: FastifyInstance) => {
  // di
  const suggestionRepository = fastify.diContainer.cradle.suggestionRepository;

  /** Get todo for specified destination */
  fastify.get<{
    Params: GetDestinationSuggestionsRequestType;
    Reply: SuggestionDto[];
  }>(
    Routes.GetDestinationActivities,
    { schema: { params: GetDestinationSuggestionsRequest } },
    async (req, rep) => {
      const { idDestination, type } = req.params;
      const todos =
        await suggestionRepository.getSuggestionsForDestinationAsync(idDestination, type);
      return _.map(todos, (t) => mapSuggestionEntityToDto(t));
    }
  );
};

export default suggestionController;
