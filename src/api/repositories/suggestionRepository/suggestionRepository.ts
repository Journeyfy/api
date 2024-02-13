import { FastifyInstance } from "fastify";
import { ISuggestionRepository } from "./ISuggestionRepository";
import { SuggestionDbo } from "../../../models/dbo/suggestion.dbo";
import { RowDataPacket } from "mysql2";
import { AddSuggestionDto } from "../../../models/dto/suggestion/addSuggestion.dto";
import { UpdateSuggestionDto } from "../../../models/dto/suggestion/updateSuggestion.dto";

const suggestionRepository = (
  fastify: FastifyInstance
): ISuggestionRepository => {
  return {
    getSingleAsync: (idSuggestion) =>
      fastify.mysql
        .execute<SuggestionDbo[] & RowDataPacket[]>(
          "SELECT * FROM `suggestion` WHERE `idSuggestion` = ?",
          [idSuggestion]
        )
        .then(
          ([[suggestion]]) => suggestion,
          (err) => {
            throw new Error(err);
          }
        ),
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
    deleteAsync: (idSuggestion) =>
      fastify.mysql.execute(
        "DELETE FROM `suggestion` WHERE `idSuggestion` = ?",
        [idSuggestion]
      ),
    addAsync: (payload: AddSuggestionDto) =>
      fastify.mysql.execute(
        "INSERT INTO `suggestion`(`idSuggestion`, `idDestination`, `type`, `title`, `mapLink`, `openAt`, `closeAt`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
        [
          payload.idDestination,
          payload.type,
          payload.title,
          payload.mapLink || null,
          payload.openAt || null,
          payload.closeAt || null,
        ]
      ),
    updateAsync: (payload: UpdateSuggestionDto) =>
      fastify.mysql.execute(
        "UPDATE `suggestion` SET `mapLink`=?, `openAt`=?, `closeAt`=? WHERE `idSuggestion` = ?",
        [
          payload.mapLink || null,
          payload.openAt || null,
          payload.closeAt || null,
          payload.idSuggestion,
        ]
      ),
  };
};

export default suggestionRepository;
