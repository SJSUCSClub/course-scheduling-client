'use client';

import React from 'react';

import { PaginatedItems } from '@/types/general';

export interface UsePaginatedItemsProps<Response> {
  initialPaginatedItems?: Response | null;
  initialFetchRequest: (page: number) => Promise<Response | null>;
}

/**
 * Fetches paginated items and provides utility functions.
 * @param initialPaginatedItems - The initial paginated items to display.
 * @param initialFetchRequest - The initial fetch request to use.
 * @returns The paginated items and utility functions.
 * @example
 * const {
 *  isEndOfList,
 *  paginatedItems,
 *  loadMore,
 *  revalidateItems,
 * } = usePaginatedItems<ProfessorReviewsRouteResponse>({
 *  initialPaginatedItems,
 *  (page) => fetch(
 *    `/professor/reviews?id=${id}&page=${page}&itemsPerPage=4&sort=relevant`,
 *    {
 *      method: 'GET',
 *    }
 *  ).then((res) => res.json())
 * });
 */
const usePaginatedItems = <Response extends PaginatedItems<object>>({
  initialPaginatedItems,
  initialFetchRequest,
}: UsePaginatedItemsProps<Response>) => {
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [fetchRequest, setFetchRequest] = React.useState(
    () => initialFetchRequest,
  );
  const [paginatedItems, setPaginatedItems] = React.useState(
    initialPaginatedItems,
  );
  const initialPage = paginatedItems?.page ? paginatedItems?.page : 0;
  const [page, setPage] = React.useState(initialPage);

  const revalidateItems = async (
    responseFetchRequest: (page: number) => Promise<Response | null>,
  ) => {
    const responsePaginatedItems = await responseFetchRequest(0);
    if (responsePaginatedItems?.items.length !== 0) setIsEndOfList(false);
    setFetchRequest(() => responseFetchRequest);
    setPaginatedItems(responsePaginatedItems);
    setPage(responsePaginatedItems?.page ?? page);
  };

  const loadMore = React.useCallback(async () => {
    if (isEndOfList) return;
    const response = fetchRequest && (await fetchRequest(page));
    setPage(response?.page ?? page);
    if (!response) return;
    if (response.items.length === 0) {
      setIsEndOfList(true);
      return;
    }
    setPaginatedItems({
      ...response,
      items: [...(paginatedItems?.items ?? []), ...response.items],
    });
  }, [isEndOfList, paginatedItems, page, fetchRequest]);

  return {
    isEndOfList,
    paginatedItems,
    loadMore,
    revalidateItems,
  };
};

export default usePaginatedItems;
