import { useEffect, useState } from 'react';
import { centerservice } from '../api/center';

export const useCenterList = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    centerservice
      .getCenterList()
      .then(setCenters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return { centers, loading };
};
