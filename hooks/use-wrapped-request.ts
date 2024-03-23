'use client';

import React from 'react';

/**
 * A hook that provides a wrapped request function that sets the loading state and error state.
 * @returns The loading state, error, and wrappedRequest function.
 * @example
 * const { loading, error, wrappedRequest } = useWrappedRequest();
 * const response = await wrappedRequest(() => fakeFetch({ endpoint: '/hello-world' }));
 * if (error) return <ErrorComponent />;
 * if (loading) return <LoadingComponent />;
 * return <Component response={response} />;
 */
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

export default useWrappedRequest;
