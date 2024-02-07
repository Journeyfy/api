import {
  DestinationDbo,
  DestinationWithImageDbo,
} from "../../../models/dbo/destination.dbo";

export interface IDestinationRepository {
  getByIdAsync: (id: number) => Promise<DestinationWithImageDbo | undefined>;
  getByTermAsync: (
    term: string,
    includeImage: boolean
  ) => Promise<DestinationDbo[] | DestinationWithImageDbo[]>;
}
