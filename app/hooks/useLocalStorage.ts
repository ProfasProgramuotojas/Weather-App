import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): {
  storedValue: T;
  setValue: (newValue: T) => void;
  removeValue: () => void;
} => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const value = window.localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : defaultValue;
    } catch (err) {
      console.error(err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
    setStoredValue(defaultValue);
  };

  return { storedValue, setValue, removeValue };
};
