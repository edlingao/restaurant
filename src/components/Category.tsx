import { useRestaurant } from "@/hooks/useRestaurant";
import "@/styles/categories.scss";

interface CategoryProps {
  title: string;
  code: string;
}

export function Category({title, code}: CategoryProps) {

  const { setCategory, category } = useRestaurant()
  const handleClick = () => {
    setCategory(code);
  }
  return (
    <button className={`category ${code === category ? 'selected' : ''}`} onClick={handleClick}>
      {title}
    </button>
  );
}

