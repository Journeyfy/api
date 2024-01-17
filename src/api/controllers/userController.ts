import { FastifyInstance } from "fastify";
import _ from "lodash";
import { RoleType } from "../../enums/roleTypes";
import { Routes } from "../../enums/routes";
import { hashAsync } from "../../utils/cryptography";
import {
  CreateUserReply,
  CreateUserReplyType,
  CreateUserRequest,
  CreateUserRequestType,
} from "../schemas/user/createUser";

const userController = async (fastify: FastifyInstance) => {
  const userService = fastify.diContainer.cradle.userService;

  /** User registration */
  fastify.post<{ Body: CreateUserRequestType; Reply: CreateUserReplyType }>(
    Routes.CreateUser,
    {
      schema: { body: CreateUserRequest, response: { 200: CreateUserReply } },
    },
    async (req, rep) => {
      const { firstName, lastName, email, password, confirmPassword, role } =
        req.body;

      if (!_.isEqual(password, confirmPassword)) {
        throw new Error("Le password non coincidono");
      }

      const hashedPwd = await hashAsync(password);
      const userRole = role ?? RoleType.User;

      const newUser = await userService.createUserAsync(
        firstName,
        lastName,
        email.trim(),
        hashedPwd,
        userRole,
        null
      );

      return newUser ? rep.send(newUser) : rep.status(500).send(newUser);
    }
  );
};

export default userController;
