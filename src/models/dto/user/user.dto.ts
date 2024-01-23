import { RoleEnum } from "../../../enums/role.enum";

export interface UserDto {
  readonly idUser: string;
  readonly displayName: string;
  readonly email: string;
  readonly role: RoleEnum;
}
