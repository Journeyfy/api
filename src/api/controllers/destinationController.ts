import { FastifyInstance } from "fastify";
import _ from "lodash";
import { Routes } from "../../enums/routes";
import {
  mapDestinationEntityToSlimDto,
  mapDestinationEntityToDto,
} from "../../mappings/dbo2dto/destinationMappings";
import {
  DestinationDbo,
  DestinationWithImageDbo,
} from "../../models/dbo/destination.dbo";
import {
  DestinationDto,
  SlimDestinationDto,
} from "../../models/dto/destination/destination.dto";
import {
  GetDestinationByTermRequest,
  GetDestinationByTermRequestType,
} from "../schemas/destination/requests/getByTerm";
import {
  GetDestinationByIdRequest,
  GetDestinationByIdRequestType,
} from "../schemas/destination/requests/getById";

const destinationController = async (fastify: FastifyInstance) => {
  const destinationRepository =
    fastify.diContainer.cradle.destinationRepository;

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
            mapDestinationEntityToDto(r)
          )
        : _.map(results as DestinationDbo[], (r) =>
            mapDestinationEntityToSlimDto(r)
          );

      return rep.send(final);
    }
  );

  /** Get destination details */
  fastify.get<{ Params: GetDestinationByIdRequestType; Reply: DestinationDto }>(
    Routes.GetDestinationById,
    { schema: { params: GetDestinationByIdRequest } },
    async (req, rep) => {
      const result = await destinationRepository.getByIdAsync(req.params.id);
      return result ? rep.send(mapDestinationEntityToDto(result)) : rep.status(404).send();
    }
  );
};

export default destinationController;
