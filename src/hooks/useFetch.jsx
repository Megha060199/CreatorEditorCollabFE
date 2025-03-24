import { useState, useEffect } from 'react';
import client from '../api/client';

export default function useFetch(endpoint, params = {}) {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    client.get(endpoint, { params })
      .then(res => {
        if (active) setData(res.data);
      })
      .catch(err => {
        console.log(err,'checkkkk')
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false };
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}
