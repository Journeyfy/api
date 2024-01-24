import jwtPlugin, {
  FastifyJwtNamespace,
  VerifyPayloadType,
} from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { v4 } from "uuid";
import { Env } from "../env";
import { IJWtPayload } from "../models/contracts/IJwtPayload";
import { IJwtUserFormat } from "../models/contracts/IJwtUserFormat";

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<VerifyPayloadType>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: IJWtPayload;
    user: IJwtUserFormat; // user type is return type of `request.user` object
  }
}

async function jwtConfigurationPlugin(fastify: FastifyInstance) {
  fastify.register(jwtPlugin, {
    secret: Env.JWT_SECRET,
    cookie: {
      cookieName: "access_token",
      signed: false,
    },
    sign: {
      key: Env.JWT_SECRET,
      algorithm: "HS256",
      expiresIn: "7d",
      jti: v4(),
      aud: Env.JWT_AUD,
      iss: Env.JWT_ISS,
    },
    verify: {
      key: Env.JWT_SECRET,
      algorithms: ["HS256"],
      allowedAud: Env.JWT_VALID_AUD,
      allowedIss: Env.JWT_VALID_ISS,
    },
    formatUser: (user) => ({ id: user.id, email: user.email, role: user.role }),
  });

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
}

export default fastifyPlugin(jwtConfigurationPlugin);
