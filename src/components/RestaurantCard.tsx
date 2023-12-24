import { Restaurant } from "@/@types";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import '@/styles/restaurant.scss';
import { Button } from "./Button";
import useIsMobile from "@/hooks/useIsMobile";
import { memo, useCallback, useMemo } from "react";

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

function StarRaiting({ raiting }: { raiting: number }) {
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
  
  const handleClick = useCallback(()=> window.open(restaurant.url, '_blank'), [restaurant.url]);

  const isMobile = useIsMobile();

  const MobileContent = useMemo(() => (
      <div className="restaurant-table" onClick={handleClick} tabIndex={-1} >
        <div className="restaurant-table__image hero" style={{
          backgroundImage: `url(${restaurant.image_url})`,
        }}></div>
        <div className="restaurant-table__content">
          <p className="elipsis"><b>{restaurant.name}</b></p>
          <StarRaiting raiting={restaurant.rating} />
          <Price price={restaurant.price} />
          <Button text="VIEW" onClick={handleClick} />
        </div>
      </div>
    ), [restaurant.name, restaurant.rating, restaurant.price, restaurant.image_url, handleClick]);
  
  const DesktopContent = useMemo(() => (
    <div className="restaurant" onClick={handleClick} tabIndex={-1}>
      <header className="hero" style={{
        backgroundImage: `url(${restaurant.image_url})`,
      }}>
      </header>
      <main className="Restaurant__main">
        <div className="content elipsis">
          <h3>{restaurant.name}</h3>
        </div> 
        <div className="categories-price">
          <p className="Restaurant__categories elipsis">
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
          <StarRaiting raiting={restaurant.rating} /> 
          <span>{restaurant.rating}</span>
        </div>
      </footer>
    </div>
  ), [handleClick, restaurant]);


  return isMobile ? MobileContent : DesktopContent;
}
