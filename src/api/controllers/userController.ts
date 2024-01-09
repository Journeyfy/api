import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import _ from "lodash";
import { v4 } from "uuid";
import { RoleType } from "../../enums/roleTypes";
import { Routes } from "../../enums/routes";
import { UserDbo } from "../../models/dbo/user.dbo";
import { UserDto } from "../../models/dto/user/user.dto";
import { hashAsync } from "../../utils/cryptography";
import {
  CreateUserReply,
  CreateUserReplyType,
  CreateUserRequest,
  CreateUserRequestType,
} from "../schemas/user/createUser";

const userController = async (fastify: FastifyInstance) => {
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
      const idUser = v4();
      const hashedPwd = await hashAsync(password);
      const userRole = role ?? RoleType.User;
      const registrationDateTimeUtc = dayjs.utc().format(); // YYYY-MM-DDTHH:mm:ssz

      const statement =
        "INSERT INTO `user`(`idUser`, `firstName`, `lastName`, `email`, `password`, `idRole`, `registeredOnUtc`) VALUES (?,?,?,?,?,?,?)";
      await fastify.mysql.execute(statement, [
        idUser,
        firstName,
        lastName,
        email.trim(),
        hashedPwd,
        userRole,
        registrationDateTimeUtc,
      ]);

      const [[newUser]] = await fastify.mysql.execute<UserDbo[]>(
        "SELECT * FROM user WHERE idUser = ?",
        [idUser]
      );

      return rep.send({
        idUser: newUser.idUser,
        displayName: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.idRole,
      } as UserDto);
    }
  );
};

export default userController;
