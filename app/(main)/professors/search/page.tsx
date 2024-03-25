import { Metadata } from 'next';
import React from 'react';

import { Search } from '@/components/forms/text-input';
import SectionLabel from '@/components/section-label';
import {
  ProfessorSearchRouteBody,
  ProfessorSearchRouteParams,
  ProfessorSearchRouteResponse,
} from '@/types/api/professor/search';
import Await from '@/utils/await';
import fakeFetch from '@/utils/fake-fetch';

export const metadata: Metadata = {
  title: 'Search Results',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const searchResultsPromise = fakeFetch<
    ProfessorSearchRouteResponse,
    ProfessorSearchRouteBody,
    ProfessorSearchRouteParams
  >({
    endpoint: '/professor/search',
    params: {
      itemsPerPage: 4,
      page: Math.max(Number(searchParams?.page) - 1, 0) || 0,
    },
    body: { filters: { search: searchParams?.query } },
    timeout: 2000,
  });

  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <section className="flex items-stretch gap-[10px]">
        <div className="w-[250px] max-lg:hidden">
          <div className="sticky top-0 flex max-h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
            <SectionLabel>Filters</SectionLabel>
            <Search helper="Find specific words." />
            {/* <TagCheckboxGroup
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
        </TagCheckboxGroup> */}
          </div>
        </div>

        <Await promise={searchResultsPromise}>
          {(results) => (
            <div className="flex flex-1 flex-col gap-[10px] pb-[10px]">
              <div className="flex justify-between">
                <SectionLabel info="Reviews">
                  {results.totalResults} Professors
                </SectionLabel>
                {/* <Dropdown
          options={['Relevant', 'Newest', 'Highest', 'Lowest']}
          values={['relevant', 'newest', 'highest', 'lowest']}
          onChange={(e) => handleSetSort(e.target.value as SortType)}
          disabled={loading}
        /> */}
              </div>
              {results?.items.map((review, i) => (
                <div key={i}>{review.name}</div>
              ))}
            </div>
          )}
        </Await>
      </section>
    </main>
  );
}
