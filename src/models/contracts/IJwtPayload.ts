import { RoleEnum } from "../../enums/role.enum";

export interface IJWtPayload {
  id: string;
  email: string;
  role: RoleEnum;
}
