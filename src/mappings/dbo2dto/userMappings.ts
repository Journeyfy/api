import { UserDbo } from "../../models/dbo/user.dbo";
import { UserDto } from "../../models/dto/user/user.dto";

export function mapUserEntityToDto(userDbo: UserDbo): UserDto {
  return {
    idUser: userDbo.idUser,
    displayName: `${userDbo.firstName} ${userDbo.lastName}`,
    email: userDbo.email,
    role: userDbo.idRole,
  };
}
