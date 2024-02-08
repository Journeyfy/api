import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Env } from "../env";

declare module "fastify" {
  interface FastifyReply {
    setAuthCookie: (token: string) => FastifyReply;
  }
}

async function replyDecoratorsPlugin(fastify: FastifyInstance) {
  fastify.decorateReply(
    "setAuthCookie",
    function (token: string) {
      return this.setCookie("access_token", token, {
        domain: Env.COOKIE_DOMAIN,
        path: "/",
        secure: true, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
        maxAge: 604800, // 7d
      });
    }
  );
}

export default fastifyPlugin(replyDecoratorsPlugin);
