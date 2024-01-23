export enum Routes {
  // authentication
  Login = "/login",

  // destinations
  GetDestinations = "/destinations",
  GetDestinationById = "/destinations/:id",
  
  // todos
  SuggestionResource = "/suggestions",
  GetDestinationActivities = SuggestionResource + "/:idDestination/:type?",

  // user
  CreateUser = "/users",
}
