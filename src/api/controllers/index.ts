import { FastifyInstance } from "fastify";
import destinationController from "./destinationController";
import userController from "./userController";
import oAuthController from "./oauthController";
import { Env } from "../../env";
import authenticationController from "./authenticationController";
import suggestionController from "./suggestionController";

const controllers = async (fastify: FastifyInstance) => {
  // health check
  fastify.get("/", async (req, rep) => rep.send("Welcome to Journeyfy apis"));

  // controllers
  fastify.register(authenticationController, { prefix: "/api/v1" });
  fastify.register(destinationController, { prefix: "/api/v1" });
  fastify.register(suggestionController, { prefix: "/api/v1" });
  fastify.register(userController, { prefix: "/api/v1" });

  if (Env.GOOGLE_CLIENT_ID != null && Env.GOOGLE_CLIENT_SECRET != null) {
    fastify.register(oAuthController);
  }
};

export default controllers;
