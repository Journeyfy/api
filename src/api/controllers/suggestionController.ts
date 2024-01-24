import { FastifyInstance } from "fastify";
import { Routes } from "../../enums/routes";
import { mapSuggestionEntityToDto } from "../../mappings/dbo2dto/suggestionMappings";
import { SuggestionDto } from "../../models/dto/suggestion/destinationActivity.dto";
import {
  GetDestinationSuggestionsRequest,
  GetDestinationSuggestionsRequestType,
} from "../schemas/suggestion/requests/getDestinationSuggestions";
import _ from "lodash";
import {
  PostDestinationSuggestionRequestRequest,
  PostDestinationSuggestionRequestRequestType,
} from "../schemas/suggestion/requests/postDestinationSuggestionRequest";
import { v4 } from "uuid";

const suggestionController = async (fastify: FastifyInstance) => {
  // di
  const suggestionRepository = fastify.diContainer.cradle.suggestionRepository;
  const suggestionRequestRepository =
    fastify.diContainer.cradle.suggestionRequestRepository;

  /** Get todo for specified destination */
  fastify.get<{
    Params: GetDestinationSuggestionsRequestType;
    Reply: SuggestionDto[];
  }>(
    Routes.GetDestinationSuggestions,
    { schema: { params: GetDestinationSuggestionsRequest } },
    async (req, rep) => {
      const { idDestination, type } = req.params;
      const todos =
        await suggestionRepository.getSuggestionsForDestinationAsync(
          idDestination,
          type
        );
      return _.map(todos, (t) => mapSuggestionEntityToDto(t));
    }
  );

  //#region Suggestion requests from users
  fastify.post<{ Body: PostDestinationSuggestionRequestRequestType }>(
    Routes.PostDestinationSuggestionRequest,
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: PostDestinationSuggestionRequestRequest,
      },
    },
    async (req, rep) => {
      await suggestionRequestRepository.insertAsync({
        idRequest: v4(),
        status: 1,
        requestType: req.body.requestType,
        idSuggestion: req.body.idSuggestion ?? null,
        idUser: req.user.id,
        idDestination: req.body.idDestination,
        suggestionType: req.body.suggestionType,
        title: req.body.title,
        mapLink: req.body.mapLink ?? null,
        openAt: req.body.openAt ?? null,
        closeAt: req.body.closeAt ?? null,
      });

      return rep.send("Richiesta effettuata!");
    }
  );
  //#endregion
};

export default suggestionController;
