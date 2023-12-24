import { Restaurant } from "@/@types";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import '@/styles/restaurant.scss';
import useIsMobile from "@/hooks/useIsMobile";
import { Button } from "./Button";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

function Price({price}: {price: string}) {
  
  const handlePrice: Record<string, string> = {
    '$': 'success',
    '$$': 'warning',
    '$$$': 'danger',
    '$$$$': 'danger',
  }; 

  return (
    <div className={"price " + handlePrice[price] }>
      <span>{price}</span>
    </div>
  );
}

function StarRaitin({ raiting }: { raiting: number }) {
  const stars = [];
  let currentRating = raiting;

  for (let i = 1; i <= 5; i++) {
    if(currentRating > 0 && currentRating < 1) {
      stars.push(StarHalfIcon);
      currentRating = 0;
    } else if(currentRating >= 1) {
      stars.push(StarIcon);
      currentRating--;
    } else {
      stars.push(StarBorderIcon);
    }
  }

  return (
    <div className="star-container">
      {stars.map((Star, index) => (
        <Star key={index} />
      ))}
    </div>
  );
}

export function RestaurantCard({restaurant}: RestaurantCardProps) {
  const isMobile = useIsMobile();
  
  const handleClick = () => window.open(restaurant.url, '_blank');

  return (
    <div className="restaurant" onClick={handleClick}>
      <header className="hero" style={{
        backgroundImage: `url(${restaurant.image_url})`,
      }}>
      </header>
      <main className="Restaurant__main">
        <div className="content">
          <h3>{restaurant.name}</h3>
        </div> 
        <div className="categories-price">
          <p className="Restaurant__categories">
            {restaurant.categories.map((category) => category.title).join(', ')}
          </p>
          <Price price={restaurant.price} />
        </div>
      </main>
      <footer>
        <div className="visit-website">
          <Button text="VIEW" onClick={handleClick} />
        </div>
        <div className="raiting">
          <StarRaitin raiting={restaurant.rating} /> 
          <span>{restaurant.rating}</span>
        </div>
      </footer>
    </div>
  );  
}
