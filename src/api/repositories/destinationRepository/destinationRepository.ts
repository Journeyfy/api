import { FastifyInstance } from "fastify";
import {
  DestinationDbo,
  DestinationWithImageDbo,
} from "../../../models/dbo/destination.dbo";
import { IDestinationRepository } from "./IDestinationRepository";

const destinationRepository = (
  fastify: FastifyInstance
): IDestinationRepository => {
  return {
    getByTermAsync: (term: string, includeImage: boolean) => {
      const statement = includeImage
        ? "SELECT t0.idDestination, t0.name, t0.popularity, t1.image FROM destination as t0 LEFT JOIN destinationcoverimage as t1 ON t1.idDestination = t0.idDestination WHERE t0.name LIKE ?"
        : "SELECT t0.idDestination, t0.name, t0.popularity FROM destination as t0 WHERE name LIKE ?";
      return fastify.mysql
        .execute<DestinationDbo[] | DestinationWithImageDbo[]>(statement, [
          `${term}%`,
        ])
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
