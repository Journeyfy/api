import { Static, Type } from "@sinclair/typebox";
import { SuggestionRequestEnum } from "../../../../enums/suggestionRequestEnum";
import { SuggestionEnum } from "../../../../enums/suggestionEnum";

export const PostDestinationSuggestionRequestRequest = Type.Object({
  requestType: Type.Readonly(Type.Enum(SuggestionRequestEnum)),
  idDestination: Type.Readonly(Type.Number()),
  suggestionType: Type.Readonly(Type.Enum(SuggestionEnum)),
  title: Type.Readonly(Type.String()),
  idSuggestion: Type.ReadonlyOptional(Type.Number()),
  mapLink: Type.ReadonlyOptional(Type.String()),
  openAt: Type.ReadonlyOptional(Type.String()),
  closeAt: Type.ReadonlyOptional(Type.String()),
});

export type PostDestinationSuggestionRequestRequestType = Static<
  typeof PostDestinationSuggestionRequestRequest
>;
