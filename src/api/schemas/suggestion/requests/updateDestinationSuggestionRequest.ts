import { Static, Type } from "@sinclair/typebox";
import { SuggestionRequestStatusEnum } from "../../../../enums/suggestionRequestStatusEnum";

export const UpdateDestinationSuggestionRequestRequest = Type.Object({
  idRequest: Type.Readonly(Type.String()),
  status: Type.ReadonlyOptional(Type.Enum(SuggestionRequestStatusEnum)),
  title: Type.ReadonlyOptional(Type.String()),
  mapLink: Type.ReadonlyOptional(Type.String()),
  openAt: Type.ReadonlyOptional(Type.String()),
  closeAt: Type.ReadonlyOptional(Type.String()),
});

export type UpdateDestinationSuggestionRequestRequestType = Static<
  typeof UpdateDestinationSuggestionRequestRequest
>;
