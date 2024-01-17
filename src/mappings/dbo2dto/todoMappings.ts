import { DestinationTodoDbo } from "../../models/dbo/todo.dbo";
import { DestinationActivityDto } from "../../models/dto/destination/destinationActivity.dto";

export function mapTodoEntityToDto(
  entity: DestinationTodoDbo
): DestinationActivityDto {
  return {
    id: entity.idTodo,
    type: entity.type,
    mapLink: entity.mapLink,
    openAt: entity.openAt,
    closeAt: entity.closeAt,
  };
}
