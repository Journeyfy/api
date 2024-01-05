import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import dbConnector from "./plugins/mysqlConnector";
import controllers from "./api/controllers";
import { Env } from "./env";

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// db
server.register(dbConnector);

// controllers
server.register(controllers, {prefix: "/api/v1"});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
