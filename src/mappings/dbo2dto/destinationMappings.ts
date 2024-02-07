import {
  DestinationDbo,
  DestinationWithImageDbo,
} from "../../models/dbo/destination.dbo";
import {
  DestinationDto,
  SlimDestinationDto,
} from "../../models/dto/destination/destination.dto";

export function mapDestinationEntityToSlimDto(
  entity: DestinationDbo
): SlimDestinationDto {
  return {
    idDestination: entity.idDestination,
    name: entity.name,
    popularity: entity.popularity,
  };
}

export function mapDestinationEntityToDto(
  entity: DestinationWithImageDbo
): DestinationDto {
  return {
    idDestination: entity.idDestination,
    name: entity.name,
    popularity: entity.popularity,
    image: entity.image.toString(),
  };
}
