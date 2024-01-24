export enum Routes {
  // authentication
  Login = "/login",

  // destinations
  GetDestinations = "/destinations",
  GetDestinationById = "/destinations/:id",
  
  // suggestions
  SuggestionResource = "/suggestions",
  GetDestinationSuggestions = SuggestionResource + "/:idDestination/:type?",
  PostDestinationSuggestionRequest = SuggestionResource + "/addRequest",

  // user
  CreateUser = "/users",
}
