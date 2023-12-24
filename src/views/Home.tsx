import { Categories } from "@/components/Categories";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useEffect } from "react";

export default function Home() {
  
  const {fetchRestaurantsHook, category, restaurants} = useRestaurant();
  useEffect(() => {
    fetchRestaurantsHook({
      location: "San Francisco",
      limit: 10,
      offset: 0,
      category,
    });
  }, [category, fetchRestaurantsHook]);

  return (
    <main>
      <header>
        <Categories />
        <main className="main restaurant-container">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </main>
      </header>
    </main>
  );
}

