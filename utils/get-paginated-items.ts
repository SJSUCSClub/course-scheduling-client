import { PaginatedItems } from '@/types/general';

/**
 * Paginates an array of items. This probably won't be used in production, but it's useful for mocking API responses.
 *
 * @param items - The array of items to paginate.
 * @param itemsPerPage - The number of items to display per page.
 * @param page - The current page number. Defaults to 0.
 * @returns The paginated items with the nextPage. If there are no more items to display, the `items` array will be empty, and the page will remain the same.
 */
const getPaginatedItems = <T>({
  items,
  itemsPerPage = items.length,
  page = 0,
}: PaginatedItems<T>): PaginatedItems<T> => {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const nextPage = start < items.length ? page + 1 : page;
  return {
    items: nextPage === page ? [] : items.slice(start, end),
    itemsPerPage,
    page: nextPage,
  };
};

export default getPaginatedItems;
