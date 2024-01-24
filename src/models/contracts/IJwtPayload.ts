import { RoleEnum } from "../../enums/roleEnum";

export interface IJWtPayload {
  id: string;
  email: string;
  role: RoleEnum;
}
