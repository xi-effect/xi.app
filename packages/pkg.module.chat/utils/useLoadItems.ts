import { useState } from 'react';

const ARRAY_SIZE = 20;
const RESPONSE_TIME_IN_MS = 1000;

export type ItemT = {
  key: number;
  value: string;
};

type ResponseT = {
  hasNextPage: boolean;
  data: ItemT[];
};

const loadItems = (startCursor = 0): Promise<ResponseT> =>
  new Promise((resolve) => {
    let newArray: ItemT[] = [];

    setTimeout(() => {
      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i += 1) {
        const newItem = {
          key: i,
          value: `This is item ${i.toString()}`,
        };
        newArray = [...newArray, newItem];
      }

      resolve({ hasNextPage: true, data: newArray });
    }, RESPONSE_TIME_IN_MS);
  });

export const useLoadItems = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemT[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const loadMore = async () => {
    setLoading(true);
    try {
      const { data, hasNextPage: newHasNextPage } = await loadItems(items.length);
      setItems((current) => [...current, ...data]);
      setHasNextPage(newHasNextPage);
    } catch (error_) {
      setError(error_ instanceof Error ? error_ : new Error('Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return { loading, items, hasNextPage, error, loadMore };
};
