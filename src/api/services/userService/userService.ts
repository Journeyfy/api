import dayjs from "dayjs";
import { v4 } from "uuid";
import { RoleEnum } from "../../../enums/roleEnum";
import { mapUserEntityToDto } from "../../../mappings/dbo2dto/userMappings";
import { IUserRepository } from "../../repositories/userRepository/IUserRepository";

const userService = (userRepository: IUserRepository) => {
  return {
    getUserByIdAsync: async (idUser: string) => {
      const user = await userRepository.getUserByIdAsync(idUser);
      return user ? mapUserEntityToDto(user) : undefined;
    },
    getUserByEmailAsync: async (email: string) => {
      const user = await userRepository.getUserByEmailAsync(email);
      return user ? mapUserEntityToDto(user) : undefined;
    },
    createUserAsync: async (
      firstName: string,
      lastName: string,
      email: string,
      password: string | null,
      idRole: RoleEnum,
      picture: string | null
    ) => {
      const idUser = v4();
      await userRepository.createUserAsync({
        idUser: idUser,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        idRole: idRole ?? 3,
        picture: picture,
        registeredOnUtc: dayjs.utc().format("YYYY-MM-DD HH:mm:ss"),
      });

      const createdUser = await userRepository.getUserByIdAsync(idUser);
      return createdUser ? mapUserEntityToDto(createdUser) : undefined;
    },
  };
};

export default userService;
