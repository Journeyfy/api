import { FastifyInstance } from "fastify";
import { Routes } from "../../enums/routes";
import { compareHashAsync } from "../../utils/cryptography";
import {
  AuthRequest,
  AuthRequestType,
} from "../schemas/authentication/authRequest";
import { RoleEnum } from "../../enums/roleEnum";

const authenticationController = async (fastify: FastifyInstance) => {
  const userRepository = fastify.diContainer.cradle.userRepository;

  fastify.post<{ Body: AuthRequestType }>(
    Routes.Login,
    {
      schema: {
        body: AuthRequest,
      },
    },
    async (req, rep) => {
      const user = await userRepository.getUserByEmailAsync(req.body.email);

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
        return rep.setAuthCookie(token, req.hostname).send();
      } else {
        throw new Error("Username o password errati");
      }
    }
  );

  fastify.get(
    "/jwtTest",
    {
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      return rep.send(req.user);
    }
  );
};

export default authenticationController;
