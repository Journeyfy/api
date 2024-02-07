import { FastifyInstance } from "fastify";
import { Routes } from "../../enums/routes";
import { mapUserEntityToDto } from "../../mappings/dbo2dto/userMappings";
import { UserDbo } from "../../models/dbo/user.dbo";
import { compareHashAsync } from "../../utils/cryptography";
import {
  AuthRequest,
  AuthRequestType,
} from "../schemas/authentication/authRequest";

const authenticationController = async (fastify: FastifyInstance) => {
  const userRepository = fastify.diContainer.cradle.userRepository;

  fastify.post<{ Body: AuthRequestType; Reply: UserDbo }>(
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
        return rep
          .setAuthCookie(token, req.hostname)
          .send(mapUserEntityToDto(user));
      } else {
        throw new Error("Username o password errati");
      }
    }
  );

  fastify.get(
    Routes.Logout,
    {
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      rep.clearCookie("access_token");
      return;
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
