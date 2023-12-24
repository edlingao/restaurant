import { Args } from "@/@types/index";
import restaurant, { fetchRestaurants, selectCategories, selectCategory, selectIsLoading, selectRestaurants } from "@/state/restaurant";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from ".";

export const useRestaurant = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectIsLoading);
  const restaurants = useAppSelector(selectRestaurants);
  const categories = useAppSelector(selectCategories);
  const category = useAppSelector(selectCategory);

  const fetchRestaurantsHook = useCallback((args: Args): any => {
    return dispatch(fetchRestaurants(args))
      .then(unwrapResult);
  }, [dispatch]);
  
  const setCategory = useCallback((category: string) => {
    return dispatch(restaurant.actions.categorySelected(category));
  }, [dispatch]);

  return {
    isFetching,
    restaurants,
    categories,
    category,
    fetchRestaurantsHook,
    setCategory,
  };
}

