'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { useDebouncedCallback } from 'use-debounce';

import Button from '@/components/button';
import Dropdown from '@/components/forms/dropdown';
import { TagCheckbox, TagCheckboxGroup } from '@/components/forms/tag-checkbox';
import TextInput from '@/components/forms/text-input';
import LoadingSpinner from '@/components/loading-spinner';
import Review from '@/components/review';
import SectionLabel from '@/components/section-label';
import {
  CourseReviewsRouteBody,
  CourseReviewsRouteParams,
  CourseReviewsRouteResponse,
} from '@/types/api/course/reviews';
import { SortType, TagType } from '@/types/general';
import { formatSearchParams } from '@/utils/fetches';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ReviewsPageProps
  extends CourseReviewsRouteBody,
    CourseReviewsRouteParams {
  loadMore: () => void;
  isLastPage: boolean;
}
const ReviewsPage: React.FC<ReviewsPageProps> = ({
  page,
  limit,
  tags,
  courseNumber,
  department,
  isLastPage,
  loadMore,
}) => {
  const { data, error, isLoading } = useSWR<CourseReviewsRouteResponse>([
    `/courses/${department}/${courseNumber}/reviews` +
      formatSearchParams({ page, limit, tags }),
    { headers: { 'ngrok-skip-browser-warning': '***' } },
  ]);

  // display data
  const noItemsAtAll = isLastPage && page === 1 && data?.items.length === 0;
  const noMoreItems = isLastPage && page === data?.pages;
  return (
    <>
      {data?.items.map((review, i) => {
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
      {error && <p>{error.toString()}</p>}
      {isLastPage ? (
        <Button
          variant="tertiary"
          disabled={noMoreItems}
          onClick={loadMore}
          loading={false}
        >
          {noItemsAtAll ? 'No Schedules ;(' : 'Show More'}
        </Button>
      ) : null}
    </>
  );
};

const PaginatedReviews: React.FC<{
  department: string;
  courseNumber: string;
}> = ({ department, courseNumber }) => {
  const [cnt, setCnt] = useState(1);
  const loadMore = () => setCnt(cnt + 1);

  const handleSetFilters = () => {
    setCnt(1); // revalidate all
  };

  const search = React.useRef<string>('');
  // TODO - do something better besides setTags since this will
  // re-render the component
  const [tags, setTags] = React.useState<TagType[]>([]);
  const professors = React.useRef<string[]>([]);
  const sort = React.useRef<SortType>('relevant');

  const handleSetSearch = (value: string) => {
    search.current = value;
    handleSetFilters();
  };

  const debouncedSetSearch = useDebouncedCallback(handleSetSearch, 500);

  const handleSetTags = (value: TagType[]) => {
    setTags(value);
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

  const pages = [];
  for (let i = 1; i <= cnt; ++i) {
    pages.push(
      <ReviewsPage
        loadMore={loadMore}
        isLastPage={i === cnt}
        department={department}
        courseNumber={courseNumber}
        tags={tags}
        key={i + tags.join('')}
        page={i}
        limit={3}
      />,
    );
  }

  // initial data used for populating tags;
  // because of caching, shouldn't incur much overhead
  const { data, error, isLoading } = useSWR<CourseReviewsRouteResponse>([
    `/courses/${department}/${courseNumber}/reviews` +
      formatSearchParams({ page: 1, limit: 3, tags }),
    { headers: { 'ngrok-skip-browser-warning': '***' } },
  ]);
  console.log(data);

  return (
    <section className="flex items-stretch gap-[10px]">
      <div className="w-[250px] max-lg:hidden">
        <div className="sticky top-0 flex max-h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
          <SectionLabel>Filters</SectionLabel>
          <TextInput
            icon={
              isLoading ? (
                <LoadingSpinner height={1} />
              ) : (
                <MagnifyingGlassIcon />
              )
            }
            placeholder="Search"
            helper="Find specific words."
            onChange={(e) => debouncedSetSearch(e.target.value)}
          />
          <TagCheckboxGroup
            onChange={handleSetTags as (value: string[]) => void}
            label="Tags"
            disabled={isLoading}
          >
            {
              data?.filters.tags.map((tag) => (
                <TagCheckbox key={tag.tag} value={tag.tag} count={tag.count}>
                  {tag.tag}
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
            {data?.totalResults} Reviews
          </SectionLabel>
          <Dropdown
            options={['Relevant', 'Newest', 'Highest', 'Lowest']}
            values={['relevant', 'newest', 'highest', 'lowest']}
            onChange={(e) => handleSetSort(e.target.value as SortType)}
            disabled={isLoading}
          />
        </div>
        {pages}
      </div>
    </section>
  );
};

export default PaginatedReviews;
