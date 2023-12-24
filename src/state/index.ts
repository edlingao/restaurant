import { configureStore } from "@reduxjs/toolkit";
import restaurant from "./restaurant";

const store = configureStore({
  reducer: {
    restaurant: restaurant.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
