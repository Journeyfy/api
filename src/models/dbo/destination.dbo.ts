export interface DestinationDbo {
  readonly idDestination: number;
  readonly name: string;
  readonly popularity?: number;
}

export interface DestinationWithImageDbo extends DestinationDbo {
  readonly image: Blob;
}
