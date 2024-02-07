import { Static, Type } from "@sinclair/typebox";

export const GetDestinationByIdRequest = Type.Object({
  id: Type.Readonly(Type.Number()),
});

export type GetDestinationByIdRequestType = Static<
  typeof GetDestinationByIdRequest
>;
