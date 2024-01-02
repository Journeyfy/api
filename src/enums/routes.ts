export enum Routes {
  // destinations
  GetDestinations = "/destinations",
  GetDestinationById = "/destinations/:id",
  GetDestinationActivities = GetDestinationById + "/activities/:type",
}
