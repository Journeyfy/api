import { FastifyJwtNamespace, VerifyPayloadType } from "@fastify/jwt";
import fastifyPlugin from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import _ from "lodash";
import { RoleEnum } from "../enums/roleEnum";

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<VerifyPayloadType>;
    authorize: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyContextConfig {
    allowedRoles?: RoleEnum[];
  }
}

async function serverDecoratorsPlugin(fastify: FastifyInstance) {
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        return await request.jwtVerify();
      } catch (err) {
        return reply.send(err);
      }
    }
  );

  fastify.decorate(
    "authorize",
    async function (reqest: FastifyRequest, reply: FastifyReply) {
      const authorizedRoles = reqest.routeOptions.config.allowedRoles;
      if (
        authorizedRoles != null &&
        !_.isEmpty(authorizedRoles) &&
        !_.includes(authorizedRoles, reqest.user.role)
      ) {
        reply.code(401);
        throw "Authorization failed!";
      }
    }
  );
}

export default fastifyPlugin(serverDecoratorsPlugin);
