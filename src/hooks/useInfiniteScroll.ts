import { useEffect, useRef } from "react";

export const useInfiniteScroll = (callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void) => {
  const options = {
    root: null,
    rootMargin: "500px",
    threshold: 0.5,
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollObserver = useRef<IntersectionObserver>(new IntersectionObserver(callback, options));
  
  useEffect(() => {
    if(scrollRef.current && scrollObserver.current) {
      scrollObserver.current.observe(scrollRef.current);
    }
  }, []);

  return { scrollRef };
}

