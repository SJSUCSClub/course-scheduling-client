'use client';

import React from 'react';
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
import usePaginatedItems from '@/hooks/use-paginated-items';
import useWrappedRequest from '@/hooks/use-wrapped-request';
import {
  ProfessorReviewsRouteBody,
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/types/api/professor/reviews';
import { SortType, TagType } from '@/types/general';
import fakeFetch from '@/utils/fake-fetch';
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const PaginatedReviews: React.FC<{
  initialPaginatedItems: ProfessorReviewsRouteResponse | null;
  professorId: number;
}> = ({ initialPaginatedItems, professorId }) => {
  const fetchRequest = (page: number) =>
    fakeFetch<
      ProfessorReviewsRouteResponse,
      ProfessorReviewsRouteBody,
      ProfessorReviewsRouteParams
    >({
      endpoint: '/professor/reviews',
      params: {
        itemsPerPage: 4,
        id: professorId,
        page: page,
      },
      body: {
        filters: {
          search: search.current,
          sort: sort.current,
          tags: tags.current,
          courses: courses.current,
        },
      },
      timeout: 3000,
    });

  const { error, loading, wrappedRequest } = useWrappedRequest();
  const { isEndOfList, paginatedItems, loadMore, revalidateItems } =
    usePaginatedItems<ProfessorReviewsRouteResponse>({
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
  const courses = React.useRef<string[]>([]);
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

  const handleSetCourses = (value: string[]) => {
    courses.current = value;
    handleSetFilters();
  };

  const handleSetSort = (value: SortType) => {
    sort.current = value;
    handleSetFilters();
  };

  return (
    <main className="flex items-stretch gap-[10px]">
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
                <TagCheckbox key={tag.tag} value={tag.tag} count={tag.count}>
                  {tag.tag}
                </TagCheckbox>
              )) as React.ReactNode[]
            }
          </TagCheckboxGroup>
          <TagCheckboxGroup
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
            onChange={(e) => handleSetSort(e.target.value as SortType)}
            disabled={loading}
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
        {paginatedItems?.items.map((review, i) => {
          const { courseNumber, department, courseId, ...rest } = review;
          return (
            <Review key={i} title={`${department}${courseNumber}`} {...rest} />
          );
        })}
        {!isEndOfList ? (
          <Button
            variant="tertiary"
            disabled={paginatedItems?.totalReviews === 0}
            onClick={loadMore}
            loading={loading}
          >
            {paginatedItems?.totalReviews !== 0 ? 'Show More' : 'No Reviews ;('}
          </Button>
        ) : null}
      </div>
    </main>
  );
};

export default PaginatedReviews;
