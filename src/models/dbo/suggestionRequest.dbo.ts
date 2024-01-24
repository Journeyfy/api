export interface SuggestionRequestDbo {
  readonly idRequest: string;
  readonly status: number;
  readonly requestType: number;
  readonly idSuggestion: number | null;
  readonly idUser: string;
  readonly idDestination: number;
  readonly suggestionType: number;
  readonly title: string;
  readonly mapLink: string | null;
  readonly openAt: string | null;
  readonly closeAt: string | null;
}
