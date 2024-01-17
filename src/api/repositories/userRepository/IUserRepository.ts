import { UserDbo } from "../../../models/dbo/user.dbo";

export interface IUserRepository {
  getUserByEmailAsync: (email: string) => Promise<UserDbo | undefined>;
  getUserByIdAsync: (id: string) => Promise<UserDbo | undefined>;
  createUserAsync: (userData: UserDbo) => Promise<any>;
}
