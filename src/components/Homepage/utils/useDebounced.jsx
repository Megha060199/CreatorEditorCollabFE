import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

export default function useDebouncedValue(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  const debouncer = useMemo(
    () => debounce(val => setDebounced(val), delay),
    [delay]
  );

  useEffect(() => {
    debouncer(value);
    return () => debouncer.cancel();
  }, [value, debouncer]);

  return debounced;
}
