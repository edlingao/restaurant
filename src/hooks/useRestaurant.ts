import { Args, Category, Restaurant } from "@/@types/index";
import restaurant, { fetchRestaurants, selectCategories, selectCategory, selectIsLoading, selectOffset, selectRestaurants } from "@/state/restaurant";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from ".";

export const useRestaurant = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectIsLoading);
  const restaurants = useAppSelector(selectRestaurants);
  const categories = useAppSelector(selectCategories);
  const category = useAppSelector(selectCategory);
  const offset = useAppSelector(selectOffset);

  const fetchRestaurantsHook = useCallback(async (args: Args): Promise<{ restaurants: Restaurant[], categories: Category[] }> => {
    return await dispatch(fetchRestaurants(args))
      .then(unwrapResult);
  }, [dispatch]);

  const setCategory = useCallback((category: string) => {
    return dispatch(restaurant.actions.categorySelected(category));
  }, [dispatch]);
  
  const addOffset = useCallback(() => {
    return dispatch(restaurant.actions.advanceOffset());
  }, [dispatch]);

  return {
    isFetching,
    restaurants,
    categories,
    category,
    fetchRestaurantsHook,
    setCategory,
    addOffset,
    offset,
  };
}

