import { useCallback, useEffect, useRef } from "react";


export function useDebounce(func, time) {
  const timer = useRef<any>();
  const cb = useCallback(function (...args) {
    if (timer) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      func(...args);
    }, time);
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
  }, [func, time]);

  return cb;
}
