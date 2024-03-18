'use client';

import React from 'react';

import useCustomFetch from '@/hooks/use-custom-fetch';
import { FetchParams } from '@/utils/fake-fetch';
import { PaginatedItems } from '@/utils/types';

/**
 * Fetches paginated items and provides a loadMore function to load more items.
 * @param initialFetchParams - The initial fetch parameters. If you provide initialPaginatedItems, the page will be incremented by 1.
 * @param initialPaginatedItems - The current paginated items. These are the items that are initially fetched from the Next.JS server. It's useful for server-side rendering the first page of items, and then fetching the rest on the client on loadMore.
 * @returns The loading state, error, isEndOfList, paginatedItems, and loadMore function.
 *
 * @example
 * ```tsx
 * const { loading, error, isEndOfList, paginatedItems, loadMore } = usePaginatedItems<ProfessorSchedulesRouteResponse, ProfessorSchedulesRouteParams>(initialFetchParams, initialPaginatedSchedules);
 * ```
 */
const usePaginatedItems = <
  Response extends PaginatedItems<object>,
  Params extends Omit<PaginatedItems<object>, 'items'>,
>(
  initialFetchParams: FetchParams<Params>,
  initialPaginatedItems: Response | null,
) => {
  const { loading, error, fetchWithCache } = useCustomFetch();
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [fetchParams, setFetchParams] = React.useState(initialFetchParams);
  const [paginatedItems, setPaginatedItems] = React.useState(
    initialPaginatedItems,
  );

  const revalidateItems = async (
    responseFetchParams: (
      prevParams: FetchParams<Params>,
    ) => FetchParams<Params>,
  ) => {
    const params = responseFetchParams(fetchParams);
    const items = await fetchWithCache<Response, Params>(params);
    setFetchParams(params);
    setPaginatedItems(items);
  };

  const useFetchPaginatedItems =
    (
      page = fetchParams.params?.page !== undefined
        ? paginatedItems
          ? fetchParams.params.page + 1
          : fetchParams.params.page
        : 0,
    ) =>
    async (params: FetchParams<Params>) => {
      const response = await fetchWithCache<Response, Params>({
        endpoint: params.endpoint,
        params: { ...(params.params as Params), page },
      });
      page = response?.page ?? page;
      return response;
    };
  const fetchPaginatedItems = React.useRef(useFetchPaginatedItems());

  const loadMore = React.useCallback(async () => {
    if (isEndOfList) return;
    const response = await fetchPaginatedItems.current(fetchParams);
    if (!response) return;
    if (response.items.length === 0) {
      setIsEndOfList(true);
      return;
    }
    setPaginatedItems({
      ...response,
      items: [...(paginatedItems?.items ?? []), ...response.items],
    });
  }, [isEndOfList, paginatedItems, fetchParams]);

  return {
    loading,
    error,
    isEndOfList,
    paginatedItems,
    loadMore,
    revalidateItems,
  };
};

export default usePaginatedItems;
