import { Categories } from "@/components/Categories";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useEffect } from "react";

export default function Home() {
  
  const {fetchRestaurantsHook, category} = useRestaurant();
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
      </header>
    </main>
  );
}

