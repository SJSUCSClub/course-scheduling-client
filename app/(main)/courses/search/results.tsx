'use client';

import React from 'react';

import SearchResult from '@/app/(main)/courses/search/search-result';
import { ParamsDropdown } from '@/components/forms/dropdown';
import {
  ParamsTagCheckboxGroup,
  TagCheckbox,
} from '@/components/forms/tag-checkbox';
import { ParamsSearch } from '@/components/forms/text-input';
import PaginationButtons from '@/components/pagination';
import SectionLabel from '@/components/section-label';
import { CourseSearchRouteResponse } from '@/types/api/course/search';
import { SearchResultSortType } from '@/types/general';

const Results: React.FC<{
  searchResults: CourseSearchRouteResponse | null;
}> = ({ searchResults }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <section className="flex flex-col gap-[10px] pb-[10px]">
      <h3 className="py-[10px]">
        Search results for {`"${searchResults?.filters.search}"`}
      </h3>
      <div className="flex items-stretch gap-[10px]">
        <div className="w-[250px] max-lg:hidden">
          <div className="sticky top-0 flex max-h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
            <SectionLabel>Filters</SectionLabel>
            <ParamsSearch
              loading={loading}
              setLoading={setLoading}
              helper="Find specific words."
            />
            <ParamsTagCheckboxGroup
              loading={loading}
              setLoading={setLoading}
              label="Professors"
              param="tags"
            >
              {
                searchResults?.filters.professors.map(
                  ({ name, count, ...rest }) => (
                    <TagCheckbox key={name} value={name} count={count}>
                      {name}
                    </TagCheckbox>
                  ),
                ) as React.ReactNode[]
              }
            </ParamsTagCheckboxGroup>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[10px] pb-[10px]">
          <div className="flex justify-between">
            <SectionLabel info="Reviews">
              {searchResults?.totalResults} Courses
            </SectionLabel>
            <ParamsDropdown
              param="sort"
              loading={loading}
              setLoading={setLoading}
              options={[
                'Highest grade',
                'Lowest grade',
                'Highest overall',
                'Lowest overall',
                'Most reviews',
                'Least reviews',
              ]}
              values={
                [
                  'highest grade',
                  'lowest grade',
                  'highest overall',
                  'lowest overall',
                  'most reviews',
                  'least reviews',
                ] as SearchResultSortType[]
              }
              defaultValue="most reviews"
            />
          </div>
          {searchResults?.items.map((review, i) => (
            <SearchResult key={i} {...review} />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <PaginationButtons
          totalPages={
            searchResults?.totalResults
              ? Math.ceil(searchResults?.totalResults / 4)
              : 0
          }
        />
      </div>
    </section>
  );
};

export default Results;
