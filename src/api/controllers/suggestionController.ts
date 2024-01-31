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
import { RoleEnum } from "../../enums/roleEnum";
import {
  UpdateDestinationSuggestionRequestRequest,
  UpdateDestinationSuggestionRequestRequestType,
} from "../schemas/suggestion/requests/updateDestinationSuggestionRequest";
import {
  DeleteSuggestionRequest,
  DeleteSuggestionRequestType,
} from "../schemas/suggestion/requests/deleteSuggestionRequest";
import {
  GetSuggestionRequestsRequest,
  GetSuggestionRequestsRequestType,
} from "../schemas/suggestion/requests/getSuggestionRequests";
import { SuggestionRequestDto } from "../../models/dto/suggestionRequest/suggestionRequest.dto";

const suggestionController = async (fastify: FastifyInstance) => {
  // di
  const suggestionRepository = fastify.diContainer.cradle.suggestionRepository;
  const suggestionRequestRepository =
    fastify.diContainer.cradle.suggestionRequestRepository;
  const suggestionRequestService =
    fastify.diContainer.cradle.suggestionRequestService;

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

  fastify.delete<{ Params: DeleteSuggestionRequestType }>(
    Routes.DeleteSuggestion,
    {
      onRequest: [fastify.authenticate],
      config: { allowedRoles: [RoleEnum.Administrator] },
      preHandler: [fastify.authorize],
      schema: { params: DeleteSuggestionRequest },
    },
    async (req, rep) => {
      const toDeleteSuggestion = await suggestionRepository.getSingleAsync(
        req.params.idSuggestion
      );

      if (toDeleteSuggestion == null) {
        return rep.status(404).send("Suggerimento di guida non trovato");
      }

      await suggestionRepository.deleteAsync(req.params.idSuggestion);
      return rep.send("Suggerimento di guida eliminato correttamente");
    }
  );

  //#region Suggestion requests
  fastify.get<{
    Params: GetSuggestionRequestsRequestType;
    Reply: SuggestionRequestDto[];
  }>(
    Routes.GetSuggestionRequests,
    {
      onRequest: [fastify.authenticate],
      config: { allowedRoles: [RoleEnum.Administrator, RoleEnum.Moderator] },
      preHandler: [fastify.authorize],
      schema: { params: GetSuggestionRequestsRequest },
    },
    async (req, rep) => {
      return await suggestionRequestService.getSuggestionRequests(
        req.params.status
      );
    }
  );

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

  fastify.post<{ Body: UpdateDestinationSuggestionRequestRequestType }>(
    Routes.UpdateDestinationSuggestionRequest,
    {
      onRequest: [fastify.authenticate],
      schema: {
        body: UpdateDestinationSuggestionRequestRequest,
      },
    },
    async (req, rep) => {
      const { idRequest, status, title, mapLink, openAt, closeAt } = req.body;
      const toUpdateRequest = await suggestionRequestRepository.getSingleAsync(
        idRequest
      );
      if (toUpdateRequest == null)
        return rep.status(404).send("Richiesta non trovata");

      if (status != toUpdateRequest.status && req.user.role === RoleEnum.User) {
        return rep
          .status(401)
          .send(
            "Utente non autorizzato a modificare lo stato di una richiesta"
          );
      }

      await suggestionRequestRepository.updateAsync(
        idRequest,
        status || toUpdateRequest.status,
        toUpdateRequest.suggestionType,
        title || toUpdateRequest.title,
        mapLink,
        openAt,
        closeAt
      );

      return rep.send("Modifica effettuata!");
    }
  );
  //#endregion
};

export default suggestionController;
