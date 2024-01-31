import { Static, Type } from "@sinclair/typebox";

export const DeleteSuggestionRequest = Type.Object({
  idSuggestion: Type.Readonly(Type.Number()),
});

export type DeleteSuggestionRequestType = Static<
  typeof DeleteSuggestionRequest
>;
