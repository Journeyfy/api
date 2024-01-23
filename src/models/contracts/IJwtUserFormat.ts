import { RoleEnum } from "../../enums/role.enum";

export interface IJwtUserFormat {
  id: string;
  email: string;
  role: RoleEnum;
}
