import { Static, Type } from "@sinclair/typebox";

export const AuthResponse = Type.Object({
  access_token: Type.Readonly(Type.String()),
});

export type AuthResponseType = Static<typeof AuthResponse>;
