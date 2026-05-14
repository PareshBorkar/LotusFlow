import { useEffect, useState } from "react";

function readStoredValue<T>(key: string, initialValue: T) {
  if (typeof window === "undefined") {
    return initialValue;
  }

  const storedValue = window.localStorage.getItem(key);

  if (storedValue === null) {
    return initialValue;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStoredValue(key, initialValue),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
