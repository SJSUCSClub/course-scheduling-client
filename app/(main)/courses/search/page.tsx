import { Metadata } from 'next';

import Results from '@/app/(main)/courses/search/results';
import { CourseSearchRouteResponse } from '@/types/api/course/search';
import { formatResponse, formatSearchParams } from '@/utils/fetches';

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
  const searchResults: CourseSearchRouteResponse = await fetch(
    process.env.BACKEND_URL +
      `/courses/search` +
      formatSearchParams({
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
      }),
  )
    .then((res) => res.json())
    .then(formatResponse);
  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <Results
        searchResults={searchResults}
        query={searchParams?.query || ''}
      />
    </main>
  );
}
