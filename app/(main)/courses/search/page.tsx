import { Metadata } from 'next';

import Results from '@/app/(main)/courses/search/results';
import {
  CourseSearchRouteBody,
  CourseSearchRouteParams,
  CourseSearchRouteResponse,
} from '@/types/api/course/search';
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
    tags?: string;
    sort?: string;
    professors?: string;
  };
}) {
  const searchResults = await fakeFetch<
    CourseSearchRouteResponse,
    CourseSearchRouteBody,
    CourseSearchRouteParams
  >({
    endpoint: '/course/search',
    params: {
      itemsPerPage: 4,
      page: Math.max(Number(searchParams?.page) - 1, 0) || 0,
    },
    body: {
      filters: {
        search: searchParams?.query,
        sort: searchParams?.sort as any,
        professors: JSON.parse(searchParams?.professors ?? '[]'),
      },
    },
    timeout: 2000,
  });
  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <Results searchResults={searchResults} />
    </main>
  );
}
