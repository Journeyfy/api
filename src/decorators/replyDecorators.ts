import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

declare module "fastify" {
  interface FastifyReply {
    setAuthCookie: (token: string, domain: string) => FastifyReply;
  }
}

async function replyDecoratorsPlugin(fastify: FastifyInstance) {
  fastify.decorateReply(
    "setAuthCookie",
    function (token: string, domain: string) {
      return this.setCookie("access_token", token, {
        domain: domain.split(":")![0],
        path: "/api",
        secure: true, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
        maxAge: 604800, // 7d
      });
    }
  );
}

export default fastifyPlugin(replyDecoratorsPlugin);
