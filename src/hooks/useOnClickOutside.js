import { useEffect, useState } from "react";
import { useRef } from "react";

function useOnClickOutside(initialState) {
  const [isVisible, setIsVisible] = useState(initialState);
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        return setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
}

export default useOnClickOutside;
