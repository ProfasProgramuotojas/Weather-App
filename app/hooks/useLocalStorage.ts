import { useState } from "react";

export const useLocalStorage = (
  key: string,
  defaultValue: any,
): {
  storedValue: any;
  setValue: (newValue: any) => void;
  removeValue: () => void;
} => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
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
    setStoredValue(null);
  };

  return { storedValue, setValue, removeValue };
};
