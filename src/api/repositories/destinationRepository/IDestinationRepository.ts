import {
  DestinationDbo,
  DestinationWithImageDbo,
} from "../../../models/dbo/destination.dbo";

export interface IDestinationRepository {
  getByTermAsync: (
    term: string,
    includeImage: boolean
  ) => Promise<DestinationDbo[] | DestinationWithImageDbo[]>;
}
