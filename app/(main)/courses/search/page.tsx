import { Metadata } from 'next';

import Results from '@/app/(main)/courses/search/results';
import {
  CourseSearchRouteBody,
  CourseSearchRouteParams,
  CourseSearchRouteResponse,
} from '@/types/api/course/search';
import { serverFetch } from '@/utils/fetches';

export const metadata: Metadata = {
  title: 'Search Results',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    tags?: string;
    sort?: string;
    professors?: string;
    departments?: string;
    satisfies?: string;
    units?: string;
  };
}) {
  const searchResults = await serverFetch<
    CourseSearchRouteResponse,
    CourseSearchRouteBody,
    CourseSearchRouteParams
  >({
    endpoint: '/courses/search',
    params: {},
    body: {
      page: Number(searchParams?.page) || 1,
      search: searchParams?.query,
      department: searchParams?.departments,
      limit: 3,
      /*
      filters: {
        search: searchParams?.query,
        sort: searchParams?.sort as any,
        professors: JSON.parse(searchParams?.professors ?? '[]'),
        departments: JSON.parse(searchParams?.departments ?? '[]'),
        satisfies: JSON.parse(searchParams?.satisfies ?? '[]'),
        units: JSON.parse(searchParams?.units ?? '[]'),
      },*/
    },
    timeout: 2000,
  });
  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <Results
        searchResults={searchResults}
        query={searchParams?.query || ''}
      />
    </main>
  );
}
