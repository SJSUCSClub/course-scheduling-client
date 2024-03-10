export const getPaginatedItems = (
  items: unknown[],
  itemsPerPage: number,
  page: number,
) => {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const nextPage = start < items.length ? page + 1 : page;
  return {
    items: nextPage === page ? [] : items.slice(start, end),
    nextPage,
  };
};
