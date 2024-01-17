import { TodoType } from "../../../enums/todoTypes";
import { DestinationTodoDbo } from "../../../models/dbo/todo.dbo";

export interface ITodoRepository {
  getTodoAsync: (
    idDestination: number,
    todoType: TodoType
  ) => Promise<DestinationTodoDbo[]>;
}
