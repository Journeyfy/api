import { Static, Type } from "@sinclair/typebox";

export const GetDestinationByTermRequest = Type.Object({
  term: Type.String(),
  includeImage: Type.Optional(Type.Boolean()),
});

export type GetDestinationByTermRequestType = Static<typeof GetDestinationByTermRequest>;
