import { FastifyInstance } from "fastify";
import _ from "lodash";
import {
  SlimDestinationDto,
  DestinationDto,
} from "../../models/dto/destinationDto";
import {
  GetDestinationByTermRequest,
  GetDestinationByTermRequestType,
} from "../schemas/destination/requests/getByTerm";
import { Routes } from "../../enums/routes";
import { GetDestinationActivitiesRequestType } from "../schemas/destination/requests/getActivities";
import { ActivityDto } from "../../models/dto/activityDto";

const destinationController = async (fastify: FastifyInstance) => {
  /** Get destination(s) by term */
  fastify.get<{
    Querystring: GetDestinationByTermRequestType;
    Reply: SlimDestinationDto[] | DestinationDto[];
  }>(
    Routes.GetDestinations,
    {
      schema: {
        querystring: GetDestinationByTermRequest,
      },
    },
    async (req, rep) => {
      const { term, includeImage } = req.query;

      const statement = includeImage
        ? "SELECT t0.idDestination, t0.name, t0.popularity, t1.image FROM destination as t0 LEFT JOIN destinationcoverimage as t1 ON t1.idDestination = t0.idDestination WHERE t0.name LIKE ?"
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
                image: d.image.toString("utf8"),
              } as DestinationDto)
          )
        : _.map(
            data as any[],
            (d) =>
              ({
                idDestination: d.idDestination,
                name: d.name,
                popularity: d.popularity,
              } as SlimDestinationDto)
          );
      return result;
    }
  );

  /** Get destination activities */
  fastify.get<{
    Params: GetDestinationActivitiesRequestType;
    Reply: ActivityDto[];
  }>(Routes.GetDestinationActivities, async (req, rep) => {
    const { id, type } = req.params;
    const statement =
      "SELECT t0.idTodo, t0.idDestination, t0.type, t0.mapLink, t0.openAt, t0.closeAt FROM todo as t0 WHERE t0.idDestination = ? AND t0.type = ?";
    const [data] = await fastify.mysql.execute(statement, [id, type]);
    return _.map(
      data as any[],
      (d) =>
        ({
          id: d.idTodo,
          type: d.type,
          mapLink: d.mapLink,
          openAt: d.openAt,
          closeAt: d.closeAt,
        } as ActivityDto)
    );
  });
};

export default destinationController;
