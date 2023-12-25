import { Categories } from "@/components/Categories";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SkeletonCard } from "@/components/RestaurantSkeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useEffect, useState } from "react";

export default function Home() {
  
  const {fetchRestaurantsHook, category, restaurants, status, addOffset } = useRestaurant();
  const [observed, setObserved] = useState(true);

  const { scrollRef } = useInfiniteScroll((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setObserved(true);
      addOffset();
      fetchRestaurantsHook({
        location: "San Francisco",
      });
    }
  });

  useEffect(() => {
    if(status === "idle") {
      fetchRestaurantsHook({
        location: "San Francisco",
      });
    }
  }, [ fetchRestaurantsHook, category, status]);

  useEffect(() => {
    if(observed) {
      setObserved(false);
    }
  }, [observed]);

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
          { status === "loading" && <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
          </>}
          <div ref={scrollRef} className="intersection"></div>
        </main>
      </header>
    </main>
  );
}


