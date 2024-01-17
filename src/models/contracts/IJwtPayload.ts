import { RoleType } from "../../enums/roleTypes";

export interface IJWtPayload {
  id: string;
  email: string;
  role: RoleType;
}
