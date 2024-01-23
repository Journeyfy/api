import { Static, Type } from "@sinclair/typebox";
import { SuggestionEnum } from "../../../../enums/suggestion.enum";

export const GetDestinationSuggestionsRequest = Type.Object({
  idDestination: Type.Readonly(Type.Integer()),
  type: Type.ReadonlyOptional(Type.Enum(SuggestionEnum)),
});

export type GetDestinationSuggestionsRequestType = Static<
  typeof GetDestinationSuggestionsRequest
>;
