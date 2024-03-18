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
    getResponseFetchParams: (
      prevFetchParams: FetchParams<Params>,
    ) => FetchParams<Params>,
  ) => {
    const responseFetchParams = getResponseFetchParams(fetchParams);
    const responsePaginatedItems = await fetchWithCache<Response, Params>(
      responseFetchParams,
    );
    setFetchParams(responseFetchParams);
    setPaginatedItems(responsePaginatedItems);
  };

  const useFetchPaginatedItems =
    (
      page = fetchParams.params?.page !== undefined
        ? paginatedItems
          ? fetchParams.params.page + 1
          : fetchParams.params.page
        : 0,
    ) =>
    async (responseFetchParams: FetchParams<Params>) => {
      const response = await fetchWithCache<Response, Params>({
        endpoint: responseFetchParams.endpoint,
        params: { ...(responseFetchParams.params as Params), page },
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
