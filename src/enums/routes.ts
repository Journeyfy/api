export enum Routes {
  // authentication
  Login = "/login",

  // destinations
  GetDestinations = "/destinations",
  GetDestinationById = "/destinations/:id",
  GetDestinationActivities = GetDestinationById + "/activities/:type",

  // user
  CreateUser = "/users",
}
