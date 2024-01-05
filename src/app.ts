import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import controllers from "./api/controllers";
import dbConnector from "./plugins/mysqlConnector";

const port = Number(process.env.PORT) || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// db
server.register(dbConnector);

// controllers
server.register(controllers, { prefix: "/api/v1" });

server.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
