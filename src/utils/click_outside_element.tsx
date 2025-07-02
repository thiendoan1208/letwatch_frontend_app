import { useEffect, useRef } from "react";

function ClickOutsideElement(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutSide);
    document.addEventListener("touchend", handleClickOutSide);

    return () => {
      document.removeEventListener("mouseup", handleClickOutSide);
      document.removeEventListener("touchend", handleClickOutSide);
    };
  }, [callback]);

  return ref;
}

export default ClickOutsideElement;


  