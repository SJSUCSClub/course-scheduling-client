'use client';

import React, { useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import { useDebouncedCallback } from 'use-debounce';

import Button, { ButtonBox, ButtonBoxProvider } from '@/components/button';
import Dropdown from '@/components/forms/dropdown';
import { TagCheckbox, TagCheckboxGroup } from '@/components/forms/tag-checkbox';
import TextInput, {
  TextInputBox,
  TextInputBoxProvider,
} from '@/components/forms/text-input';
import LoadingSpinner from '@/components/loading-spinner';
import Review from '@/components/review';
import SectionLabel from '@/components/section-label';
import {
  ProfessorReviewsRouteBody,
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/types/api/professor/reviews';
import { SortType, TagType } from '@/types/general';
import { clientFetch } from '@/utils/fetches';
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const useReviews = (
  params: ProfessorReviewsRouteParams,
  body: ProfessorReviewsRouteBody,
) =>
  useSWR<ProfessorReviewsRouteResponse>(
    ['/professors/reviews', params, body],
    (([url, p, b]: [any, any, any]) =>
      clientFetch<
        ProfessorReviewsRouteResponse,
        ProfessorReviewsRouteBody,
        ProfessorReviewsRouteParams
      >({
        endpoint: url,
        params: p,
        body: body,
      })) as Fetcher<ProfessorReviewsRouteResponse>,
  );

interface ReviewsPageProps
  extends ProfessorReviewsRouteBody,
    ProfessorReviewsRouteParams {
  loadMore: () => void;
  isLastPage: boolean;
}
const ReviewsPage: React.FC<ReviewsPageProps> = ({
  id,
  page,
  tags,
  limit,
  loadMore,
  isLastPage,
}) => {
  const { data, error, isLoading } = useReviews({ id }, { page, limit, tags });

  // display data
  const noItemsAtAll = isLastPage && page === 1 && data?.items.length === 0;
  const noMoreItems = isLastPage && page === data?.pages;

  return (
    <>
      {data?.items.map((review, i) => {
        const { courseNumber, department, ...rest } = review;
        return (
          <Review
            key={i}
            title={`${department}${courseNumber}`}
            href={`courses/${department}${courseNumber}`}
            {...rest}
            // TODO - get a real value here
            overall={-1}
            upvotes={rest.votes.upvotes}
            userName={rest.username}
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
  professorId: string;
}> = ({ professorId }) => {
  const [cnt, setCnt] = useState(1);
  const loadMore = () => setCnt(cnt + 1);

  const handleSetFilters = () => {
    setCnt(1);
  };

  const search = React.useRef<string>('');
  // TODO - use something besides state since that
  // re-renders the entire component
  const [tags, setTags] = React.useState<TagType[]>([]);
  const courses = React.useRef<string[]>([]);
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

  const handleSetCourses = (value: string[]) => {
    courses.current = value;
    handleSetFilters();
  };

  const handleSetSort = (value: SortType) => {
    sort.current = value;
    handleSetFilters();
  };

  const { data, isLoading } = useReviews(
    { id: professorId },
    { page: 1, tags: tags, limit: 3 },
  );

  const pages = [];
  for (let i = 1; i <= cnt; ++i) {
    pages.push(
      <ReviewsPage
        page={i}
        limit={3}
        tags={tags}
        id={professorId}
        loadMore={loadMore}
        isLastPage={i === cnt}
        key={i + tags.join('')}
      />,
    );
  }

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
                // TODO - get an actual value here
                <TagCheckbox key={tag} value={tag} count={-1}>
                  {tag}
                </TagCheckbox>
              )) as React.ReactNode[]
            }
          </TagCheckboxGroup>
          {/*<TagCheckboxGroup
            onChange={handleSetCourses}
            label="Courses"
            disabled={loading}
          >
            {
              paginatedItems?.filters.courses.map((tag) => (
                <TagCheckbox
                  key={tag.course}
                  value={tag.course}
                  count={tag.count}
                >
                  {tag.course}
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
        <div className="flex gap-[10px]">
          <TextInputBoxProvider placeholder="Write a review..." fullHeight>
            <TextInputBox className="flex-1" />
          </TextInputBoxProvider>
          <ButtonBoxProvider variant="primary" postfix={<ChevronRightIcon />}>
            <ButtonBox className="h-full rounded-md bg-background text-primary" />
          </ButtonBoxProvider>
        </div>
        {pages}
      </div>
    </section>
  );
};

export default PaginatedReviews;
