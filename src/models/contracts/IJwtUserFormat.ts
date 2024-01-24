import { RoleEnum } from "../../enums/roleEnum";

export interface IJwtUserFormat {
  id: string;
  email: string;
  role: RoleEnum;
}
