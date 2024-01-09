import { BaseDbo } from "./base.dbo";

export interface DestinationDbo extends BaseDbo {
  readonly idDestination: number;
  readonly name: string;
  readonly popularity?: number;
}

export interface DestinationWithImageDbo extends DestinationDbo {
  readonly image: Blob;
}
