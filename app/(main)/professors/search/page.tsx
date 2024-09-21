// 'use client';
import { Metadata } from 'next';

import Results from '@/app/(main)/professors/search/results';
import { ProfessorSearchRouteResponse } from '@/types/api/professor/search';
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
    coursesInSession?: string;
  };
}) {
  const searchResults: ProfessorSearchRouteResponse = await fetch(
    process.env.BACKEND_URL +
      `/professors/search` +
      formatSearchParams({
        page: Number(searchParams?.page) || 1, // 1-indexed
        limit: 3,
        query: searchParams?.query,
        /*filters: {
          search: searchParams?.query,
          sort: searchParams?.sort as any,
          coursesInSession: JSON.parse(searchParams?.coursesInSession ?? '[]'),
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
