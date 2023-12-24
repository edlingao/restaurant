import { Categories } from "@/components/Categories";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useEffect } from "react";

export default function Home() {
  
  const {fetchRestaurantsHook, category, restaurants, isFetching, offset  } = useRestaurant();

  console.log(offset);
  useEffect(() => {
    
    if (isFetching) return;

    fetchRestaurantsHook({
      location: "San Francisco",
    });

  }, [category, fetchRestaurantsHook, isFetching, offset]);

  return (
    <main>
      <header>
        <Categories />
        <main className="main restaurant-container">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              restaurant={restaurant}
            />
          ))}
          <div className="intersection"></div>
        </main>
      </header>
    </main>
  );
}


