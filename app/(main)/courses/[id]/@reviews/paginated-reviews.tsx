'use client';

import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Button from '@/components/button';
import Dropdown from '@/components/forms/dropdown';
import { TagCheckbox, TagCheckboxGroup } from '@/components/forms/tag-checkbox';
import TextInput from '@/components/forms/text-input';
import LoadingSpinner from '@/components/loading-spinner';
import Review from '@/components/review';
import SectionLabel from '@/components/section-label';
import usePaginatedItems from '@/hooks/use-paginated-items';
import useWrappedRequest from '@/hooks/use-wrapped-request';
import {
  CourseReviewsResponse,
  CourseReviewsRouteBody,
  CourseReviewsRouteParams,
} from '@/types/api/course/reviews';
import { SortType, TagType } from '@/types/general';
import serverFetch from '@/utils/server-fetch';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PaginatedReviews: React.FC<{
  initialPaginatedItems: CourseReviewsResponse | null;
  department: string;
  courseNumber: string;
}> = ({ initialPaginatedItems, department, courseNumber }) => {
  const fetchRequest = (page: number) =>
    serverFetch<
      CourseReviewsResponse,
      CourseReviewsRouteBody,
      CourseReviewsRouteParams
    >({
      endpoint: '/courses/reviews',
      params: {
        department: department,
        courseNumber: courseNumber,
      },
      body: {
        tags: tags.current,
        page: page,
        limit: 3,
      },
      timeout: 3000,
    });

  const { error, loading, wrappedRequest } = useWrappedRequest();
  const { isEndOfList, paginatedItems, loadMore, revalidateItems } =
    usePaginatedItems<CourseReviewsResponse>({
      initialPaginatedItems,
      initialFetchRequest: (page: number) =>
        wrappedRequest(() => fetchRequest(page)),
    });

  const handleSetFilters = () => {
    return revalidateItems((page: number) =>
      wrappedRequest(() => fetchRequest(page)),
    );
  };

  const search = React.useRef<string>('');
  const tags = React.useRef<TagType[]>([]);
  const professors = React.useRef<string[]>([]);
  const sort = React.useRef<SortType>('relevant');

  const handleSetSearch = (value: string) => {
    search.current = value;
    handleSetFilters();
  };

  const debouncedSetSearch = useDebouncedCallback(handleSetSearch, 500);

  const handleSetTags = (value: TagType[]) => {
    tags.current = value;
    handleSetFilters();
  };

  const handleSetProfessors = (value: string[]) => {
    professors.current = value;
    handleSetFilters();
  };

  const handleSetSort = (value: SortType) => {
    sort.current = value;
    handleSetFilters();
  };

  return (
    <section className="flex items-stretch gap-[10px]">
      <div className="w-[250px] max-lg:hidden">
        <div className="sticky top-0 flex max-h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
          <SectionLabel>Filters</SectionLabel>
          <TextInput
            icon={
              loading ? <LoadingSpinner height={1} /> : <MagnifyingGlassIcon />
            }
            placeholder="Search"
            helper="Find specific words."
            onChange={(e) => debouncedSetSearch(e.target.value)}
          />
          <TagCheckboxGroup
            onChange={handleSetTags as (value: string[]) => void}
            label="Tags"
            disabled={loading}
          >
            {
              paginatedItems?.filters.tags.map((tag) => (
                // TODO - put real value, not just -1
                <TagCheckbox key={tag} value={tag} count={-1}>
                  {tag}
                </TagCheckbox>
              )) as React.ReactNode[]
            }
          </TagCheckboxGroup>
          {/*<TagCheckboxGroup
            onChange={handleSetProfessors}
            label="Professors"
            disabled={loading}
          >
            {
              paginatedItems?.filters.professors.map((tag) => (
                <TagCheckbox key={tag.name} value={tag.name} count={tag.count}>
                  {tag.name}
                </TagCheckbox>
              )) as React.ReactNode[]
            }
          </TagCheckboxGroup>*/}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[10px] pb-[10px]">
        <div className="flex justify-between">
          <SectionLabel info="Reviews">
            {paginatedItems?.totalResults} Reviews
          </SectionLabel>
          <Dropdown
            options={['Relevant', 'Newest', 'Highest', 'Lowest']}
            values={['relevant', 'newest', 'highest', 'lowest']}
            onChange={(e) => handleSetSort(e.target.value as SortType)}
            disabled={loading}
          />
        </div>
        {paginatedItems?.items.map((review, i) => {
          const { professorName, professorId, ...rest } = review;
          return (
            <Review
              key={i}
              title={`${professorName}`}
              href={`/professors/${professorId}`}
              {...rest}
              userName={rest.username || ''}
              upvotes={rest.votes.upvotes}
              overall={rest.quality}
            />
          );
        })}
        {!isEndOfList ? (
          <Button
            variant="tertiary"
            disabled={paginatedItems?.totalResults === 0}
            onClick={loadMore}
            loading={loading}
          >
            {paginatedItems?.totalResults !== 0 ? 'Show More' : 'No Reviews ;('}
          </Button>
        ) : null}
      </div>
    </section>
  );
};

export default PaginatedReviews;
