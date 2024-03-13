import { PaginatedItems } from '@/utils/types';

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
