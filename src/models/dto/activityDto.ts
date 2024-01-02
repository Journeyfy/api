import { TodoType } from "../../enums/todoTypes";

export interface ActivityDto {
  readonly id: number;
  readonly type: TodoType;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
