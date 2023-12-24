import { useRef, useEffect, WheelEvent } from "react";

export function useHorizontalScroll() {
  const elRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent<HTMLElement>) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 5,
          behavior: "smooth"
        });
      };
      // @ts-expect-error - Do not hace access to the right element
      el.addEventListener("wheel", onWheel);
      // @ts-expect-error - Do not hace access to the right element
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
