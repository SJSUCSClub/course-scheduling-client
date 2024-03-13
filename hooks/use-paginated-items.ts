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
  initialPaginatedItems?: Response,
) => {
  const { loading, error, fetchWithCache } = useCustomFetch();
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [paginatedItems, setPaginatedItems] = React.useState(
    initialPaginatedItems,
  );

  const useFetchPaginatedItems = React.useCallback(
    (
      page = initialFetchParams.params?.page !== undefined
        ? initialPaginatedItems
          ? initialFetchParams.params.page + 1
          : initialFetchParams.params.page
        : 0,
    ) =>
      async () => {
        const response = await fetchWithCache<Response, Params>({
          endpoint: initialFetchParams.endpoint,
          params: { ...(initialFetchParams.params as Params), page },
        });
        page = response?.page ?? page;
        return response;
      },
    [fetchWithCache, initialFetchParams, initialPaginatedItems],
  );
  const fetchPaginatedItems = React.useRef(useFetchPaginatedItems());

  const loadMore = React.useCallback(async () => {
    if (isEndOfList) return;
    const response = await fetchPaginatedItems.current();
    if (!response) return;
    if (response.items.length === 0) {
      setIsEndOfList(true);
      return;
    }
    setPaginatedItems({
      ...response,
      items: [...(paginatedItems?.items ?? []), ...response.items],
    });
  }, [isEndOfList, paginatedItems]);
  return { loading, error, isEndOfList, paginatedItems, loadMore };
};

export default usePaginatedItems;
