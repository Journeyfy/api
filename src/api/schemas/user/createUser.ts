import { Static, Type } from "@sinclair/typebox";
import { RoleEnum } from "../../../enums/roleEnum";
import { UserDto } from "../../../models/dto/user/user.dto";

export const CreateUserRequest = Type.Object({
  firstName: Type.Readonly(Type.String()),
  lastName: Type.Readonly(Type.String()),
  email: Type.Readonly(Type.String({ format: "email" })),
  password: Type.Readonly(Type.String({ minLength: 8 })),
  confirmPassword: Type.Readonly(Type.String({})),
  role: Type.ReadonlyOptional(Type.Enum(RoleEnum)),
});

export const CreateUserReply = Type.Unsafe<UserDto>();

export type CreateUserRequestType = Static<typeof CreateUserRequest>;
export type CreateUserReplyType = Static<typeof CreateUserReply>;
