import { FastifyInstance } from "fastify";
import destinationController from "./destinationController";

const controllers = async (fastify: FastifyInstance) => {
  fastify.register(destinationController);
};

export default controllers;
