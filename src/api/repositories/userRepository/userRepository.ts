import { FastifyInstance } from "fastify";
import _ from "lodash";
import { RowDataPacket } from "mysql2";
import { UserDbo } from "../../../models/dbo/user.dbo";
import { IUserRepository } from "./IUserRepository";

const userRepository = (fastify: FastifyInstance): IUserRepository => {
  return {
    getUserByEmailAsync: (email: string) =>
      fastify.mysql
        .execute<UserDbo[] & RowDataPacket[]>(
          "SELECT * FROM user WHERE email = ?",
          [email]
        )
        .then(
          ([[user]]) => {
            console.log(user);
            return user;
          },
          (err) => {
            throw new Error(err);
          }
        ),
    getUserByIdAsync: (id: string) =>
      fastify.mysql
        .execute<UserDbo[] & RowDataPacket[]>(
          "SELECT * FROM user WHERE idUser = ?",
          [id]
        )
        .then(
          ([[user]]) => user,
          (err) => {
            throw new Error(err);
          }
        ),
    createUserAsync: (userData: UserDbo) =>
      fastify.mysql.execute(
        "INSERT INTO `user`(`idUser`, `firstName`, `lastName`, `email`, `password`, `idRole`, `picture`, `registeredOnUtc`) VALUES (?,?,?,?,?,?,?,?)",
        _.values(userData)
      ),
  };
};

export default userRepository;
