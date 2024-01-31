import { Static, Type } from "@sinclair/typebox";
import { SuggestionRequestStatusEnum } from "../../../../enums/suggestionRequestStatusEnum";

export const GetSuggestionRequestsRequest = Type.Object({
  status: Type.ReadonlyOptional(Type.Enum(SuggestionRequestStatusEnum)),
});

export type GetSuggestionRequestsRequestType = Static<
  typeof GetSuggestionRequestsRequest
>;
