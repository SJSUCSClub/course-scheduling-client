// 'use client';
import { Metadata } from 'next';

import Results from '@/app/(main)/professors/search/results';
import {
  ProfessorSearchBody,
  ProfessorSearchParams,
  ProfessorSearchResponse,
} from '@/types/api/professor/search';
import serverFetch from '@/utils/server-fetch';

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
  const searchResults = await serverFetch<
    ProfessorSearchResponse,
    ProfessorSearchBody,
    ProfessorSearchParams
  >({
    endpoint: '/professors/search',
    params: {},
    body: {
      page: Number(searchParams?.page) || 1, // 1-indexed
      limit: 3,
      search: searchParams?.query,
      /*filters: {
        search: searchParams?.query,
        sort: searchParams?.sort as any,
        coursesInSession: JSON.parse(searchParams?.coursesInSession ?? '[]'),
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
