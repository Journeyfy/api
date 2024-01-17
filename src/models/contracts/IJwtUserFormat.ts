import { RoleType } from "../../enums/roleTypes";

export interface IJwtUserFormat {
  id: string;
  email: string;
  role: RoleType;
}
