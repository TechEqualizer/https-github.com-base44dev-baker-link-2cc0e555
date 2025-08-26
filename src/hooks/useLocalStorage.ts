import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook for managing localStorage with automatic cleanup
 */
export function useLocalStorageWithCleanup<T>(
  key: string,
  initialValue: T,
  ttl?: number // Time to live in milliseconds
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [value, setValue] = useLocalStorage(key, initialValue);

  // Clear the localStorage item
  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.warn(`Error clearing localStorage key "${key}":`, error);
    }
  };

  // Set up TTL cleanup if provided
  useEffect(() => {
    if (ttl) {
      const timer = setTimeout(() => {
        clearValue();
      }, ttl);

      return () => clearTimeout(timer);
    }
  }, [ttl, key]);

  return [value, setValue, clearValue];
}