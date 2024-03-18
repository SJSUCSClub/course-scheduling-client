'use client';

import React from 'react';

import {
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/utils/types';
import Filters from '@/app/(main)/professors/[id]/@reviews/filters';
import usePaginatedItems from '@/hooks/use-paginated-items';
import SectionLabel from '@/components/section-label';
import { FetchParams } from '@/utils/fake-fetch';
import Dropdown from '@/components/forms/dropdown';
import Review from '@/components/review';
import Button from '@/components/button';

const PaginatedReviews: React.FC<{
  initialPaginatedReviews: ProfessorReviewsRouteResponse;
  initialFetchParams: FetchParams<ProfessorReviewsRouteParams>;
}> = ({ initialPaginatedReviews, initialFetchParams }) => {
  const {
    loading,
    error,
    isEndOfList,
    paginatedItems,
    loadMore,
    revalidateItems,
  } = usePaginatedItems<
    ProfessorReviewsRouteResponse,
    ProfessorReviewsRouteParams
  >(initialFetchParams, initialPaginatedReviews);

  const handleSetFilters =
    (type: 'tags' | 'courses' | 'sort') => (value: string[] | string) =>
      revalidateItems((prevFetchParams) => ({
        ...prevFetchParams,
        params: prevFetchParams.params && {
          ...prevFetchParams.params,
          filters: {
            ...prevFetchParams.params.filters,
            [type]: typeof value === 'string' ? value : value.sort(),
          },
        },
      }));

  const handleSetSort: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    handleSetFilters('sort')(event.target.value);
  };

  return (
    <main className="flex items-stretch gap-[10px]">
      <div className="w-[250px] max-lg:hidden">
        <div className="sticky top-0 flex h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
          <Filters
            handleSetFilters={handleSetFilters}
            loading={loading}
            paginatedItems={paginatedItems}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[10px] pb-[10px]">
        <div className="flex justify-between">
          <SectionLabel info="Reviews">
            {paginatedItems?.totalReviews} Reviews
          </SectionLabel>
          <Dropdown
            options={['Relevant', 'Newest', 'Highest', 'Lowest']}
            values={['relevant', 'newest', 'highest', 'lowest']}
            onChange={handleSetSort}
            disabled={loading}
          />
        </div>
        {paginatedItems?.items.map((review, i) => {
          const { courseNumber, department, courseId, ...rest } = review;
          return (
            <Review key={i} title={`${department}${courseNumber}`} {...rest} />
          );
        })}
        {!isEndOfList ? (
          <Button variant="tertiary" onClick={loadMore} loading={loading}>
            Show More
          </Button>
        ) : null}
      </div>
    </main>
  );
};

export default PaginatedReviews;
