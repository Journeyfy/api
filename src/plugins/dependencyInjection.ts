import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix/lib/classic";
import { asFunction } from "awilix";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { IUserRepository } from "../api/repositories/userRepository/IUserRepository";
import userRepository from "../api/repositories/userRepository/userRepository";
import { IDestinationRepository } from "../api/repositories/destinationRepository/IDestinationRepository";
import { ITodoRepository } from "../api/repositories/todoRepository/ITodoRepository";
import destinationRepository from "../api/repositories/destinationRepository/destinationRepository";
import todoRepository from "../api/repositories/todoRepository/todoRepository";
import { IUserService } from "../api/services/userService/IUserService";
import userService from "../api/services/userService/userService";

declare module "@fastify/awilix" {
  interface Cradle {
    userRepository: IUserRepository;
    destinationRepository: IDestinationRepository;
    todoRepository: ITodoRepository;
    userService: IUserService;
  }
}

const dependencyInjectionSetup = async (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, { disposeOnClose: true });

  diContainer.register({
    userRepository: asFunction(() => userRepository(fastify)).scoped(),
    destinationRepository: asFunction(() =>
      destinationRepository(fastify)
    ).scoped(),
    todoRepository: asFunction(() => todoRepository(fastify)).scoped(),
    userService: asFunction(userService).scoped(),
  });
};

export default fastifyPlugin(dependencyInjectionSetup);
