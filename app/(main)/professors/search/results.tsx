'use client';

import React from 'react';

import SearchResult from '@/app/(main)/professors/search/search-result';
import { ParamsDropdown } from '@/components/forms/dropdown';
import PaginationButtons from '@/components/pagination';
import SectionLabel from '@/components/section-label';
import { ProfessorSearchRouteResponse } from '@/types/api/professor/search';
import { SearchResultSortType } from '@/types/general';

const Results: React.FC<{
  query: string;
  searchResults: ProfessorSearchRouteResponse | null;
}> = ({ query, searchResults }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <section className="flex flex-col gap-[10px] pb-[10px]">
      <h3 className="py-[10px]">Search results for {`"${query}"`}</h3>
      <div className="flex items-stretch gap-[10px]">
        {/* <div className="w-[250px] max-lg:hidden">
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
              label="Courses In Session"
              param="tags"
            >
              {
                searchResults?.filters.coursesInSession.map(
                  ({ courseInSession, count }) => (
                    <TagCheckbox
                      key={courseInSession}
                      value={courseInSession}
                      count={count}
                    >
                      {courseInSession}
                    </TagCheckbox>
                  ),
                ) as React.ReactNode[]
              }
            </ParamsTagCheckboxGroup>
          </div>
        </div> */}
        <div className="flex flex-1 flex-col gap-[10px] pb-[10px]">
          <div className="flex justify-between">
            <SectionLabel info="Reviews">
              {searchResults?.totalResults} Professors
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
