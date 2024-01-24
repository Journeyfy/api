import { FastifyInstance } from "fastify";
import { SuggestionRequestDbo } from "../../../models/dbo/suggestionRequest.dbo";
import { ISuggestionRequestRepository } from "./ISuggestionRequestRepository";
import _ from "lodash";

const suggestionRequestRepository = (
  fastify: FastifyInstance
): ISuggestionRequestRepository => {
  return {
    insertAsync: (payload: SuggestionRequestDbo) =>
      fastify.mysql.execute(
        "INSERT INTO `suggestionrequest`(`idRequest`, `status`, `requestType`, `idSuggestion`, `idUser`, `idDestination`, `suggestionType`, `title`, `mapLink`, `openAt`, `closeAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        _.values(payload)
      ),
  };
};

export default suggestionRequestRepository;
