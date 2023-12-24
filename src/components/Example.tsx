import { useRestaurant } from "@/hooks/useRestaurant";
import { useEffect } from "react";


export function Example() {
  const { fetchRestaurantsHook, restaurants, categories, isFetching } = useRestaurant(); 
  
  useEffect(() => {
    fetchRestaurantsHook({location: 'san francisco', limit: 1, offset: 0, category: ''});
  }, []);

  return (
    <div>
      <h1>Example</h1>
      {isFetching && <h1>Loading...</h1>}
      {JSON.stringify(restaurants)}
      {JSON.stringify(categories)}
    </div>
  );
}
