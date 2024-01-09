import { Static, Type } from "@sinclair/typebox";
import { TodoType } from "../../../../enums/todoTypes";

export const GetDestinationActivitiesRequest = Type.Object({
  id: Type.Integer(),
  type: Type.Enum(TodoType),
});

export type GetDestinationActivitiesRequestType = Static<
  typeof GetDestinationActivitiesRequest
>;
