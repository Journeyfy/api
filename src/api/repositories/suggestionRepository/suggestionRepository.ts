import { FastifyInstance } from "fastify";
import { ISuggestionRepository } from "./ISuggestionRepository";
import { SuggestionDbo } from "../../../models/dbo/suggestion.dbo";
import { RowDataPacket } from "mysql2";

const suggestionRepository = (
  fastify: FastifyInstance
): ISuggestionRepository => {
  return {
    getSuggestionsForDestinationAsync: (idDestination, suggestionType) => {
      const [statement, params] = suggestionType
        ? [
            "SELECT t0.idSuggestion, t0.idDestination, t0.type, t0.title, t0.mapLink, t0.openAt, t0.closeAt FROM suggestion as t0 WHERE t0.idDestination = ? AND t0.type = ?",
            [idDestination, suggestionType],
          ]
        : [
            "SELECT t0.idSuggestion, t0.idDestination, t0.type, t0.title, t0.mapLink, t0.openAt, t0.closeAt FROM suggestion as t0 WHERE t0.idDestination = ?",
            [idDestination],
          ];
      return fastify.mysql
        .execute<SuggestionDbo[] & RowDataPacket[]>(statement, params)
        .then(
          ([suggestions]) => suggestions,
          (err) => {
            throw new Error(err);
          }
        );
    },
  };
};

export default suggestionRepository;
