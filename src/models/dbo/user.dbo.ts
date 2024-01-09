import { BaseDbo } from "./base.dbo";

export interface UserDbo extends BaseDbo {
  readonly idUser: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly idRole: number;
  readonly registeredOnUtc: Date;
}
