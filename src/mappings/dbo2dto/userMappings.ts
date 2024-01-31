import { UserDbo } from "../../models/dbo/user.dbo";
import { SlimUserDto } from "../../models/dto/user/slimUser.dto";
import { UserDto } from "../../models/dto/user/user.dto";

export function mapUserEntityToDto(userDbo: UserDbo): UserDto {
  return {
    idUser: userDbo.idUser,
    displayName: `${userDbo.firstName} ${userDbo.lastName}`,
    email: userDbo.email,
    role: userDbo.idRole,
  };
}

export function mapUserEntityToSlimDto(entity: UserDbo): SlimUserDto {
  return {
    idUser: entity.idUser,
    displayName: `${entity.firstName} ${entity.lastName}`,
    email: entity.email,
  };
}
