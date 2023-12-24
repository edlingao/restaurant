import { useRef, useEffect, WheelEvent } from "react";

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent<HTMLUListElement>) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
      // @ts-expect-error - Do not hace access to the right element
        el.scrollTo({
      // @ts-expect-error - Do not hace access to the right element
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
