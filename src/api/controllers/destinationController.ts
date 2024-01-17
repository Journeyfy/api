import { FastifyInstance } from "fastify";
import _ from "lodash";
import { Routes } from "../../enums/routes";
import {
  mapDestinationEntityToDto,
  mapDestinationWithImageEntityToDto,
} from "../../mappings/dbo2dto/destinationMappings";
import { mapTodoEntityToDto } from "../../mappings/dbo2dto/todoMappings";
import {
  DestinationDbo,
  DestinationWithImageDbo,
} from "../../models/dbo/destination.dbo";
import {
  DestinationDto,
  SlimDestinationDto,
} from "../../models/dto/destination/destination.dto";
import { DestinationActivityDto } from "../../models/dto/destination/destinationActivity.dto";
import {
  GetDestinationActivitiesRequest,
  GetDestinationActivitiesRequestType,
} from "../schemas/destination/requests/getActivities";
import {
  GetDestinationByTermRequest,
  GetDestinationByTermRequestType,
} from "../schemas/destination/requests/getByTerm";

const destinationController = async (fastify: FastifyInstance) => {
  const { destinationRepository, todoRepository } = fastify.diContainer.cradle;

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
      const results = await destinationRepository.getByTermAsync(
        term,
        includeImage ?? false
      );

      const final = includeImage
        ? _.map(results as DestinationWithImageDbo[], (r) =>
            mapDestinationWithImageEntityToDto(r)
          )
        : _.map(results as DestinationDbo[], (r) =>
            mapDestinationEntityToDto(r)
          );

      return rep.send(final);
    }
  );

  /** Get destination activities */
  fastify.get<{
    Params: GetDestinationActivitiesRequestType;
    Reply: DestinationActivityDto[];
  }>(
    Routes.GetDestinationActivities,
    { schema: { params: GetDestinationActivitiesRequest } },
    async (req, rep) => {
      const { id, type } = req.params;
      const todos = await todoRepository.getTodoAsync(id, type);
      return _.map(todos, (t) => mapTodoEntityToDto(t));
    }
  );
};

export default destinationController;
