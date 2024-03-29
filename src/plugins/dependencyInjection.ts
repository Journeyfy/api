import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix/lib/classic";
import { asFunction } from "awilix";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { IUserRepository } from "../api/repositories/userRepository/IUserRepository";
import userRepository from "../api/repositories/userRepository/userRepository";
import { IDestinationRepository } from "../api/repositories/destinationRepository/IDestinationRepository";
import { ISuggestionRepository } from "../api/repositories/suggestionRepository/ISuggestionRepository";
import destinationRepository from "../api/repositories/destinationRepository/destinationRepository";
import suggestionRepository from "../api/repositories/suggestionRepository/suggestionRepository";
import { IUserService } from "../api/services/userService/IUserService";
import userService from "../api/services/userService/userService";
import { ISuggestionRequestRepository } from "../api/repositories/suggestionRequestRepository/ISuggestionRequestRepository";
import suggestionRequestRepository from "../api/repositories/suggestionRequestRepository/suggestionRequestRepository";
import { ISuggestionRequestService } from "../api/services/suggestionRequestService/ISuggestionRequestService";
import suggestionRequestService from "../api/services/suggestionRequestService/suggestionRequestService";

declare module "@fastify/awilix" {
  interface Cradle {
    userRepository: IUserRepository;
    destinationRepository: IDestinationRepository;
    suggestionRepository: ISuggestionRepository;
    suggestionRequestRepository: ISuggestionRequestRepository;
    userService: IUserService;
    suggestionRequestService: ISuggestionRequestService;
  }
}

const dependencyInjectionSetup = async (fastify: FastifyInstance) => {
  fastify.register(fastifyAwilixPlugin, { disposeOnClose: true });

  diContainer.register({
    userRepository: asFunction(() => userRepository(fastify)).scoped(),
    destinationRepository: asFunction(() =>
      destinationRepository(fastify)
    ).scoped(),
    suggestionRepository: asFunction(() =>
      suggestionRepository(fastify)
    ).scoped(),
    suggestionRequestRepository: asFunction(() =>
      suggestionRequestRepository(fastify)
    ).scoped(),
    userService: asFunction(userService).scoped(),
    suggestionRequestService: asFunction(suggestionRequestService).scoped(),
  });
};

export default fastifyPlugin(dependencyInjectionSetup);
