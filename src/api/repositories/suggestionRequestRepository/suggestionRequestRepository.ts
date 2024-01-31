import { FastifyInstance } from "fastify";
import _, { map } from "lodash";
import { RowDataPacket } from "mysql2";
import { SuggestionEnum } from "../../../enums/suggestionEnum";
import { SuggestionRequestDbo } from "../../../models/dbo/suggestionRequest.dbo";
import { ISuggestionRequestRepository } from "./ISuggestionRequestRepository";

const suggestionRequestRepository = (
  fastify: FastifyInstance
): ISuggestionRequestRepository => {
  return {
    getSingleAsync: (id: string) =>
      fastify.mysql
        .execute<SuggestionRequestDbo[] & RowDataPacket[]>(
          "SELECT * FROM `suggestionrequest` WHERE `idRequest` = ?",
          [id]
        )
        .then(
          ([[request]]) => request,
          (err) => {
            throw new Error(err);
          }
        ),
    getAllAsync: () =>
      fastify.mysql
        .execute<SuggestionRequestDbo[] & RowDataPacket[]>(
          "SELECT * FROM `suggestionrequest`",
          []
        )
        .then(
          ([results]) => results,
          (err) => {
            throw new Error(err);
          }
        ),
    getAllByStatusAsync: (status) =>
      fastify.mysql
        .execute<SuggestionRequestDbo[] & RowDataPacket[]>(
          "SELECT * FROM `suggestionrequest` WHERE `status` = ?",
          [status]
        )
        .then(
          ([results]) => results,
          (err) => {
            throw new Error(err);
          }
        ),
    insertAsync: (payload: SuggestionRequestDbo) =>
      fastify.mysql.execute(
        "INSERT INTO `suggestionrequest`(`idRequest`, `status`, `requestType`, `idSuggestion`, `idUser`, `idDestination`, `suggestionType`, `title`, `mapLink`, `openAt`, `closeAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        _.values(payload)
      ),
    updateAsync: (
      idRequest: string,
      status: number,
      suggestionType: SuggestionEnum,
      title: string,
      mapLink?: string,
      openAt?: string,
      closeAt?: string
    ) =>
      fastify.mysql.execute(
        "UPDATE `suggestionrequest` SET `status`=?, `suggestionType`=?, `title`=?, `mapLink`=?, `openAt`=?, `closeAt`=? WHERE `idRequest`=?",
        [
          status,
          suggestionType,
          title,
          mapLink || null,
          openAt || null,
          closeAt || null,
          idRequest,
        ]
      ),
  };
};

export default suggestionRequestRepository;
