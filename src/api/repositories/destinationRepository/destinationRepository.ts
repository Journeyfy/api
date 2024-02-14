import { FastifyInstance } from "fastify";
import {
  DestinationDbo,
  DestinationWithImageDbo,
} from "../../../models/dbo/destination.dbo";
import { IDestinationRepository } from "./IDestinationRepository";
import { RowDataPacket } from "mysql2";

const destinationRepository = (
  fastify: FastifyInstance
): IDestinationRepository => {
  return {
    getByIdAsync: (id: number, includeImage?: boolean) => {
      const statement = includeImage
        ? "SELECT t0.idDestination, t0.name, t0.popularity, t1.image FROM destination as t0 LEFT JOIN destinationcoverimage as t1 ON t1.idDestination = t0.idDestination WHERE t0.idDestination = ?"
        : "SELECT t0.idDestination, t0.name, t0.popularity FROM destination as t0 WHERE t0.idDestination = ?";
      return fastify.mysql
        .execute<(DestinationWithImageDbo[] | DestinationDbo[]) & RowDataPacket[]>(statement, [id])
        .then(
          ([[res]]) => res,
          (err) => {
            throw new Error(err);
          }
        );
    },
    getByTermAsync: (term: string, includeImage: boolean) => {
      const statement = includeImage
        ? "SELECT t0.idDestination, t0.name, t0.popularity, t1.image FROM destination as t0 LEFT JOIN destinationcoverimage as t1 ON t1.idDestination = t0.idDestination WHERE t0.name LIKE ?"
        : "SELECT t0.idDestination, t0.name, t0.popularity FROM destination as t0 WHERE name LIKE ?";
      return fastify.mysql
        .execute<
          (DestinationDbo[] | DestinationWithImageDbo[]) & RowDataPacket[]
        >(statement, [`${term}%`])
        .then(
          ([destinations]) => destinations,
          (err) => {
            throw new Error(err);
          }
        );
    },
  };
};

export default destinationRepository;
