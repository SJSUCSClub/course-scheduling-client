'use client';

import fakeFetch, { FetchParams } from '@/utils/fake-fetch';
import React from 'react';

const useWrappedRequest = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const wrappedRequest = React.useCallback(
    async <T>(promise: () => Promise<T>): Promise<T | null> => {
      setLoading(true);
      try {
        const response = await promise();
        return response;
      } catch (error) {
        setError(error as string);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { loading, error, wrappedRequest };
};

const getCacheKey = (endpoint: string, params?: object) => {
  return `${endpoint}${params ? `@${JSON.stringify(params)}` : ''}`;
};

const useCustomFetch = () => {
  const cache = React.useRef<Map<string, string>>(new Map<string, string>());
  const { loading, error, wrappedRequest } = useWrappedRequest();

  const fetchWithCache = React.useCallback(
    async <Data, Params extends object = object>({
      endpoint,
      params,
    }: FetchParams<Params>): Promise<Data | null> =>
      wrappedRequest<Data>(async () => {
        const cacheKey = getCacheKey(endpoint, params);
        const cacheResponse = cache.current.get(cacheKey);

        if (cacheResponse) {
          return JSON.parse(cacheResponse) as Promise<Data>;
        }

        const result = await fakeFetch<Data, Params>({
          endpoint,
          params,
        });
        cache.current.set(cacheKey, JSON.stringify(result));
        return result;
      }),
    [cache, wrappedRequest],
  );

  const fetchWithoutCache = React.useCallback(
    async <Data, Params extends object = object>({
      endpoint,
      params,
    }: FetchParams<Params>): Promise<Data | null> =>
      wrappedRequest<Data>(async () => {
        const result = await fakeFetch<Data, Params>({
          endpoint,
          params,
        });
        return result;
      }),
    [wrappedRequest],
  );

  return { loading, error, fetchWithCache, fetchWithoutCache };
};

export default useCustomFetch;
