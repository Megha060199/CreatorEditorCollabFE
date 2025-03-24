
import { useState } from 'react';
import client from '../api/client';

export default function usePost(endpoint) {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const post = async (body = {}, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await client.post(endpoint, body, config);
      setData(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
}
