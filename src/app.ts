import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { destinationRouter } from "./api/routes/destinationRouter";
import dbConnector from "./plugins/mysqlConnector";

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// db
server.register(dbConnector);

// routes
server.register(destinationRouter, { prefix: "/api/v1" });

// services

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
