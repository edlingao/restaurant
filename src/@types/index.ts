export type Restaurant = {
  name: string;
  url: string;
  image_url: string;
  price: string;
  rating: number;
  categories: Category[];
}

export type Category = {
  title: string;
  alias: string;
}

export type Action = {
  type: string;
  payload: Category | Restaurant;
}

export interface Args {
  location: string;
  limit?: number;
  offset?: number;
  category?: string;
}

