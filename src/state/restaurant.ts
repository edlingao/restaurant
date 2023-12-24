import { Restaurant, Category, Args } from "@/@types/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseURL } from "@/constants/index";

export type RestaurantState = {
  restaurants: Restaurant[];
  categories: Category[];
  status: string;
  error?: string;
  location: string;
  limit: number;
  offset: number;
  category?: string;
}

const initialState: RestaurantState = {
  restaurants: [],
  categories: [],
  status: 'idle',
  error: undefined,
  category: "",
  location: 'san francisco',
  limit: 20,
  offset: 0,
};


export const fetchRestaurants = createAsyncThunk('restaurant/fetch', async (args: Args, {getState}): Promise<{restaurants: Restaurant[], categories: Category[], save: boolean}> => {
  const state = getState() as RestaurantState;

  const searchParams = new URLSearchParams({
    limit: state.limit.toString(),
    offset: state.offset.toString(),
    category: state.category || "",
  }).toString();

  const response = await fetch(`${BaseURL}/restaurants/${args.location}?${searchParams}`, {
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${import.meta.env.API_KEY}`,
    },
  });

  return response.json();
});

export const selectIsLoading = (state: { restaurant: RestaurantState }) => state.restaurant.status === 'loading';
export const selectRestaurants = (state: { restaurant: RestaurantState }) => state.restaurant.restaurants;
export const selectCategories = (state: { restaurant: RestaurantState }) => state.restaurant.categories;
export const selectCategory = (state: { restaurant: RestaurantState }) => state.restaurant.category;
export const selectLimit = (state: { restaurant: RestaurantState }) => state.restaurant.limit;
export const selectOffset = (state: { restaurant: RestaurantState }) => state.restaurant.offset;


export default createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    categorySelected(state, action) {
      state.category = action.payload;
    },
    locationSelected(state, action) {
      state.location = action.payload;
    },
    advanceOffset(state) {
      state.offset += state.limit;
    },
  },
  extraReducers(builder) {
      builder
        .addCase(fetchRestaurants.pending, (state) => {
          state.status = 'loading';
          return state;
        })
        .addCase(fetchRestaurants.fulfilled, (state, action) => {
          state.status = 'succeeded';

          if (false/*action.payload.save*/) {
            state.restaurants = [...state.restaurants, ...action.payload.restaurants]; 
          } else {
            state.restaurants = action.payload.restaurants;
          }

          state.categories = action.payload.categories;
          return state;
        })
        .addCase(fetchRestaurants.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          return state;
        });
  },
});

