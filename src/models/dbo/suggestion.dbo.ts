export interface SuggestionDbo {
  readonly idSuggestion: number;
  readonly idDestination: number;
  readonly type: number;
  readonly title: string;
  readonly mapLink?: string;
  readonly openAt?: string;
  readonly closeAt?: string;
}
