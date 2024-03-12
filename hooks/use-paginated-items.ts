import { PaginatedItems } from '@/utils/get-paginated-items';
import useCustomFetch from '@/hooks/use-custom-fetch';
import React from 'react';
import { FetchParams } from '@/utils/fake-fetch';

const usePaginatedItems = <
  Response extends PaginatedItems<object>,
  Params extends Omit<PaginatedItems<object>, 'items'>,
>(
  initialFetchParams: FetchParams<Params>,
  currentPaginatedItems?: Response,
) => {
  const { loading, error, fetchWithCache } = useCustomFetch();
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [paginatedItems, setPaginatedItems] = React.useState(
    currentPaginatedItems,
  );

  const fetchPaginatedItems = React.useCallback(
    (
      (
        page = initialFetchParams.params?.page
          ? initialFetchParams.params.page + 1
          : 0,
      ) =>
      async () => {
        const response = await fetchWithCache<Response, Params>({
          endpoint: initialFetchParams.endpoint,
          params: { ...(initialFetchParams.params as Params), page },
        });
        page = response?.page ?? page;
        console.log(page);
        return response;
      }
    )(),
    [fetchWithCache, initialFetchParams],
  );

  const loadMore = React.useCallback(async () => {
    if (isEndOfList) return;
    const response = await fetchPaginatedItems();
    if (!response) return;
    if (response.items.length === 0) {
      setIsEndOfList(true);
      return;
    }
    setPaginatedItems({
      ...response,
      items: [...(paginatedItems?.items ?? []), ...response.items],
    });
  }, [isEndOfList, fetchWithCache, paginatedItems]);
  return { loading, error, isEndOfList, paginatedItems, loadMore };
};

export default usePaginatedItems;
