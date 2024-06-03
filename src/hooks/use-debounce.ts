import { useEffect, useRef, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debounceVal, setDebounceVal] = useState<T | null>(null);
  let timerRef = useRef<number | undefined>();
  useEffect(() => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebounceVal(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value]);
  return debounceVal as T;
};

export default useDebounce;
