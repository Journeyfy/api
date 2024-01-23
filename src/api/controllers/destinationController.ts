import { FastifyInstance } from "fastify";
import _ from "lodash";
import { Routes } from "../../enums/routes";
import {
  mapDestinationEntityToDto,
  mapDestinationWithImageEntityToDto,
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
            mapDestinationWithImageEntityToDto(r)
          )
        : _.map(results as DestinationDbo[], (r) =>
            mapDestinationEntityToDto(r)
          );

      return rep.send(final);
    }
  );
};

export default destinationController;
