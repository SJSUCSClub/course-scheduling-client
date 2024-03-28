// 'use client';
import { Metadata } from 'next';

import Results from '@/app/(main)/professors/search/results';
import Dropdown from '@/components/forms/dropdown';
import SectionLabel from '@/components/section-label';
import {
  ProfessorSearchRouteBody,
  ProfessorSearchRouteParams,
  ProfessorSearchRouteResponse,
} from '@/types/api/professor/search';
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
    coursesInSession?: string;
  };
}) {
  const searchResults = await fakeFetch<
    ProfessorSearchRouteResponse,
    ProfessorSearchRouteBody,
    ProfessorSearchRouteParams
  >({
    endpoint: '/professor/search',
    params: {
      itemsPerPage: 10,
      page: Math.max(Number(searchParams?.page) - 1, 0) || 0,
    },
    body: {
      filters: {
        search: searchParams?.query,
        sort: searchParams?.sort as any,
        coursesInSession: JSON.parse(searchParams?.coursesInSession ?? '[]'),
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
