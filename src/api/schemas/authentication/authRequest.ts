import { Static, Type } from "@sinclair/typebox";

export const AuthRequest = Type.Object({
  email: Type.Readonly(Type.String({ format: "email" })),
  password: Type.Readonly(Type.String()),
});

export type AuthRequestType = Static<typeof AuthRequest>;
