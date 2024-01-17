import { BaseDbo } from "./base.dbo";

export interface UserDbo extends BaseDbo {
  readonly idUser: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string | null;
  readonly idRole: number;
  readonly picture: string | null;
  readonly registeredOnUtc: string;
}
