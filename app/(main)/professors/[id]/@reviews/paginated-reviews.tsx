'use client';

import React from 'react';

import {
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/utils/types';
import usePaginatedItems from '@/hooks/use-paginated-items';
import SectionLabel from '@/components/section-label';
import { FetchParams } from '@/utils/fake-fetch';
import Button from '@/components/button';
import Review from '@/components/review';

const PaginatedReviews: React.FC<{
  initialPaginatedReviews: ProfessorReviewsRouteResponse;
  initialFetchParams: FetchParams<ProfessorReviewsRouteParams>;
}> = ({ initialPaginatedReviews, initialFetchParams }) => {
  const { loading, error, isEndOfList, paginatedItems, loadMore } =
    usePaginatedItems<
      ProfessorReviewsRouteResponse,
      ProfessorReviewsRouteParams
    >(initialFetchParams, initialPaginatedReviews);

  return (
    <>
      <SectionLabel info="Statistics">
        {initialPaginatedReviews.totalReviews} Reviews
      </SectionLabel>
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
    </>
  );
};

export default PaginatedReviews;
