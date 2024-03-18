'use client';

import React from 'react';

import {
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/utils/types';
import { TagCheckbox, TagCheckboxGroup } from '@/components/forms/tag-checkbox';
import SectionLabel from '@/components/section-label';
import { FetchParams } from '@/utils/fake-fetch';
import usePaginatedItems from '@/hooks/use-paginated-items';
import Review from '@/components/review';
import Button from '@/components/button';
import Dropdown from '@/components/forms/dropdown';

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
      <div className="w-[250px]">
        <div className="sticky top-0 flex h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
          <SectionLabel>Filters</SectionLabel>
          <TagCheckboxGroup
            onChange={handleSetFilters('tags')}
            label="Tags"
            disabled={loading}
          >
            {paginatedItems?.filters.tags.map((tag) => (
              <TagCheckbox key={tag.tag} value={tag.tag} count={tag.count}>
                {tag.tag}
              </TagCheckbox>
            ))}
          </TagCheckboxGroup>
          <TagCheckboxGroup
            onChange={handleSetFilters('courses')}
            label="Courses"
            disabled={loading}
          >
            {paginatedItems?.filters.courses.map((tag) => (
              <TagCheckbox
                key={tag.course}
                value={tag.course}
                count={tag.count}
              >
                {tag.course}
              </TagCheckbox>
            ))}
          </TagCheckboxGroup>
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
