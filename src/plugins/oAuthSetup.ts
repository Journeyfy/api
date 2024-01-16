import oAuthPlugin, { OAuth2Namespace } from "@fastify/oauth2";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Env } from "../env";

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

async function googleOAuthSetup(fastify: FastifyInstance) {
  fastify.register(oAuthPlugin, {
    name: "googleOAuth2",
    scope: ["email", "profile"],
    credentials: {
      client: {
        id: Env.GOOGLE_CLIENT_ID,
        secret: Env.GOOGLE_CLIENT_SECRET,
      },
      auth: oAuthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/oauth/google",
    callbackUri: "http://localhost:3000/oauth/google/callback",
  });
}

export const googleOAuthSetupPlugin = fastifyPlugin(googleOAuthSetup);
