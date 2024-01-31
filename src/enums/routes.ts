export enum Routes {
  // authentication
  Login = "/login",

  // destinations
  GetDestinations = "/destinations",
  GetDestinationById = "/destinations/:id",
  
  // suggestions
  SuggestionResource = "/suggestions",
  GetDestinationSuggestions = SuggestionResource + "/:idDestination/:type?",
  DeleteSuggestion = SuggestionResource + "/:idSuggestion",
  GetSuggestionRequests = SuggestionResource + "/getRequests/:status?",
  PostDestinationSuggestionRequest = SuggestionResource + "/addRequest",
  UpdateDestinationSuggestionRequest = SuggestionResource + "/updateRequest",

  // user
  CreateUser = "/users",
}
