import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para persistir estado en Local Storage.
 * Incluye validación y manejo de errores (try/catch en JSON.parse)
 * para garantizar integridad de datos según principios de desarrollo seguro.
 *
 * @param {string} key - Clave de almacenamiento
 * @param {*} initialValue - Valor inicial si no hay datos guardados
 * @returns {[any, Function]} [valor, setter]
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) return initialValue;

      const parsed = JSON.parse(stored);

      // Validación básica de integridad
      if (parsed === undefined || parsed === null) return initialValue;

      return parsed;
    } catch (error) {
      // Si el JSON está corrupto, limpiar y usar valor inicial
      console.error(`[useLocalStorage] Error al leer "${key}":`, error);
      try {
        localStorage.removeItem(key);
      } catch (e) {
        // Local Storage no disponible (modo privado, etc.)
      }
      return initialValue;
    }
  });

  // Persistir cambios con manejo de errores
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[useLocalStorage] Error al escribir "${key}":`, error);
    }
  }, [key, value]);

  // Setter con validación opcional
  const setStoredValue = useCallback((newValue) => {
    try {
      setValue((prev) => {
        const next = typeof newValue === 'function' ? newValue(prev) : newValue;
        return next;
      });
    } catch (error) {
      console.error(`[useLocalStorage] Error al actualizar "${key}":`, error);
    }
  }, []);

  return [value, setStoredValue];
}