import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import controllers from "./api/controllers";
import { Env } from "./env";
import "./plugins/dayjsExtensions";
import dependencyInjectionSetup from "./plugins/dependencyInjection";
import jwtConfigurationPlugin from "./plugins/jwtConfiguration";
import dbConnector from "./plugins/mysqlConnector";
import { googleOAuthSetupPlugin } from "./plugins/oAuthSetup";
import replyDecorators from "./decorators/replyDecorators";
import serverDecorators from "./decorators/serverDecorators";
import cors from "@fastify/cors";

const port = Number(process.env.PORT) || 5050;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// oAuth setup
if (Env.GOOGLE_CLIENT_ID != null && Env.GOOGLE_CLIENT_SECRET != null) {
  server.register(googleOAuthSetupPlugin);
}

// db
server.register(dbConnector);

// jwt configuration
server.register(jwtConfigurationPlugin);

// decorators
server.register(serverDecorators);
server.register(replyDecorators);

// hooks
server.addHook('onRequest', (req, rep, done) => {
  // Some code
  const authHeader = req.cookies["access_token"];
  if (authHeader) {
    req.headers.authorization = `Bearer ${authHeader}`;
  }
  done()
})

// dependency injection
server.register(dependencyInjectionSetup);

// controllers
server.register(controllers);

// cors
server.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
});

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
