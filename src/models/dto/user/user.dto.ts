import { RoleType } from "../../../enums/roleTypes";

export interface UserDto {
  readonly idUser: string;
  readonly displayName: string;
  readonly email: string;
  readonly role: RoleType;
}
