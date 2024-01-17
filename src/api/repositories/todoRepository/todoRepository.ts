import { FastifyInstance } from "fastify";
import { ITodoRepository } from "./ITodoRepository";
import { DestinationTodoDbo } from "../../../models/dbo/todo.dbo";

const todoRepository = (fastify: FastifyInstance): ITodoRepository => {
  return {
    getTodoAsync: (idDestination, todoType) =>
      fastify.mysql
        .execute<DestinationTodoDbo[]>(
          "SELECT t0.idTodo, t0.idDestination, t0.type, t0.mapLink, t0.openAt, t0.closeAt FROM todo as t0 WHERE t0.idDestination = ? AND t0.type = ?",
          [idDestination, todoType]
        )
        .then(
          ([todoList]) => todoList,
          (err) => {
            throw new Error(err);
          }
        ),
  };
};

export default todoRepository;
