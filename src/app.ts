import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import controllers from "./api/controllers";
import { Env } from "./env";
import "./plugins/dayjsExtensions";
import jwtConfigurationPlugin from "./plugins/jwtConfiguration";
import dbConnector from "./plugins/mysqlConnector";
import { googleOAuthSetupPlugin } from "./plugins/oAuthSetup";
import cookiePlugin from "@fastify/cookie";

const port = Number(process.env.PORT) || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// oAuth setup
if (Env.GOOGLE_CLIENT_ID != null && Env.GOOGLE_CLIENT_SECRET != null) {
  server.register(googleOAuthSetupPlugin);
}

// db
server.register(dbConnector);

// cookie registration
// server.register(cookiePlugin);

// jwt configuration
server.register(jwtConfigurationPlugin);



// controllers
server.register(controllers);

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
