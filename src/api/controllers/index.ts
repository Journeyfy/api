import { FastifyInstance } from "fastify";
import destinationController from "./destinationController";
import userController from "./userController";
import oauthController from "./oauthController";

const controllers = async (fastify: FastifyInstance) => {
  fastify.register(destinationController, { prefix: "/api/v1" });
  fastify.register(userController, { prefix: "/api/v1" });
  fastify.register(oauthController);
};

export default controllers;
