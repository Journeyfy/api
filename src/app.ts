import fastify from "fastify";
import dbConnector from "./plugins/mysql-connector";

const server = fastify();

server.register(dbConnector);

server.get("/ping", async (req, res) => {
  const [rows] = await server.mysql.query("SELECT name FROM destination limit ?", [10]);
  res.send(rows);
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
