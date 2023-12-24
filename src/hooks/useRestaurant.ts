import { Args } from "@/@types/index";
import { fetchRestaurants, selectCategories, selectIsLoading, selectRestaurants } from "@/state/restaurant";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from ".";

export const useRestaurant = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectIsLoading);
  const restaurants = useAppSelector(selectRestaurants);
  const categories = useAppSelector(selectCategories);
  const category = useAppSelector(selectCategories);

  const fetchRestaurantsHook = useCallback((args: Args): any => {
    return dispatch(fetchRestaurants(args))
      .then(unwrapResult);
  }, [fetchRestaurants]);

  return {
    isFetching,
    restaurants,
    categories,
    category,
    fetchRestaurantsHook,
  };
}

