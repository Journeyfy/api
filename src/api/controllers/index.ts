import { FastifyInstance } from "fastify";
import destinationController from "./destinationController";
import userController from "./userController";

const controllers = async (fastify: FastifyInstance) => {
  fastify.register(destinationController);
  fastify.register(userController);
};

export default controllers;
