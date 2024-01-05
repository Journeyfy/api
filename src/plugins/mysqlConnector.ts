import { MySQLPromiseConnection } from "@fastify/mysql";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Env } from "../env";

// if you passed promise = true, type = 'connection'
declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromiseConnection;
  }
}

async function dbConnector(fastify: FastifyInstance) {
  fastify.register(require("@fastify/mysql"), {
    promise: true,
    connectionString: Env.CONNECTION_STRING,
  });
}

export default fastifyPlugin(dbConnector);
