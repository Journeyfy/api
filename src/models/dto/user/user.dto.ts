import { RoleEnum } from "../../../enums/roleEnum";

export interface UserDto {
  readonly idUser: string;
  readonly displayName: string;
  readonly email: string;
  readonly role: RoleEnum;
}
