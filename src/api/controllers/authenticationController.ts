import { FastifyInstance } from "fastify";
import { Routes } from "../../enums/routes";
import { UserDbo } from "../../models/dbo/user.dbo";
import { compareHashAsync } from "../../utils/cryptography";
import {
  AuthRequest,
  AuthRequestType,
} from "../schemas/authentication/authRequest";
import {
  AuthResponse,
  AuthResponseType,
} from "../schemas/authentication/authResponse";

const authenticationController = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: AuthRequestType }>(
    Routes.Login,
    {
      schema: {
        body: AuthRequest,
      },
    },
    async (req, rep) => {
      const [[user]] = await fastify.mysql.execute<UserDbo[]>(
        "SELECT * FROM user WHERE email = ?",
        [req.body.email]
      );

      if (user == null) {
        rep.status(404);
        throw new Error("Utente non trovato");
      }

      if (await compareHashAsync(req.body.password, user.password)) {
        const payload = {
          id: user.idUser,
          email: user.email,
          role: user.idRole,
        };
        const token = await rep.jwtSign(payload);
        return rep
          .setCookie("access_token", token, {
            domain: "localhost",
            path: "/api",
            secure: true, // send cookie over HTTPS only
            httpOnly: true,
            sameSite: true, // alternative CSRF protection
            maxAge: 604800 // 7d
          })
          .send();
      } else {
        throw new Error("Username o password errati");
      }
    }
  );

  fastify.get(
    "/jwtTest",
    { onRequest: [fastify.authenticate] },
    async (req, rep) => {
      return rep.send(req.user);
    }
  );
};

export default authenticationController;
