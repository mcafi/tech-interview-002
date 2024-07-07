export type Filters = {
  priceFrom: string | null;
  priceTo: string | null;
  ratingFrom: string | null;
  ratingTo: string | null;
  category: string;
};

export type SavedSearch = Filters & {
  count: number;
};
