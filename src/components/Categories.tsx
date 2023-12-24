import { useRestaurant } from "@/hooks/useRestaurant";
import { Category } from "./Category";
import "@/styles/categories.scss";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export function Categories() {
  const {categories} = useRestaurant();
  const scrollRef = useHorizontalScroll();

  return (
    <div>
      <ul ref={scrollRef} className="categories">
        {categories.map((category) => (
          <Category key={category.alias} title={category.title} code={category.alias} />
        ))}
      </ul>
    </div>
  );

}

