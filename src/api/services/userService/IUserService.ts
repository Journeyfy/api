import { RoleEnum } from "../../../enums/role.enum";
import { UserDto } from "../../../models/dto/user/user.dto";

export interface IUserService {
  getUserByIdAsync: (idUser: string) => Promise<UserDto | undefined>;
  getUserByEmailAsync: (email: string) => Promise<UserDto | undefined>;
  createUserAsync: (
    firstName: string,
    lastName: string,
    email: string,
    password: string | null,
    idRole: RoleEnum,
    picture: string | null
  ) => Promise<UserDto | undefined>;
}
