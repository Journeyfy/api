import { FastifyInstance } from "fastify";
import _ from "lodash";
import {
    DestinationDto,
    DestinationWithImageDto,
} from "../../models/dto/destinationDto";
import {
    GetDestinationByTermRequest,
    GetDestinationByTermRequestType,
} from "../schemas/destination/requests/getByTerm";

export async function destinationRouter(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: GetDestinationByTermRequestType;
    Reply: DestinationDto[] | DestinationWithImageDto[];
  }>(
    "/destinations",
    {
      schema: {
        querystring: GetDestinationByTermRequest,
      },
    },
    async (request, reply) => {
      const { term, includeImage } = request.query;

      const statement = includeImage
        ? "SELECT t0.idDestination, t0.name, t0.popularity, t1.image FROM destination as t0, destinationcoverimage as t1 WHERE name LIKE ?"
        : "SELECT t0.idDestination, t0.name, t0.popularity FROM destination as t0 WHERE name LIKE ?";
      const [data] = await fastify.mysql.execute(statement, [`${term}%`]);
      const result = includeImage
        ? _.map(
            data as any[],
            (d) =>
              ({
                idDestination: d.idDestination,
                name: d.name,
                popularity: d.popularity,
                image: d.image,
              } as DestinationWithImageDto)
          )
        : _.map(
            data as any[],
            (d) =>
              ({
                idDestination: d.idDestination,
                name: d.name,
                popularity: d.popularity,
              } as DestinationDto)
          );
      return result;
    }
  );
}
