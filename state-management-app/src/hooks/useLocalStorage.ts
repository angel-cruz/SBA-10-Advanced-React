
import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {

  // Get saved data when the component first loads
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue) as T;
      }

      return initialValue;

    } catch {
      return initialValue;
    }
  });

  // Save data whenever the value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Could not save data:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
