'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { Card } from '@/components/atoms';
import { ParamSelect, SearchBar } from '@/components/molecules';
import { fetcher } from '@/providers/swr-config';

interface SearchResultData {
  total_results: number;
  pages: number;
}

interface CourseResults extends SearchResultData {
  filters: {
    department: string[];
    courses: {
      name: string;
      department: string;
      course_number: string;
      sml: number;
    }[];
  };
}

interface ProfessorResults extends SearchResultData {
  courses: {
    name: string;
    email: string;
    search_results: number;
  }[];
}

interface ScheduleResults extends SearchResultData {
  filters: {
    term: string[];
    year: number[];
    professor_name: string[];
    course_number: string[];
    department: string[];
    mode_of_instruction: string[];
    units: number[];
  };
  schedules: {
    term: string;
    year: number;
    class_number: number;
    units: number;
    section: string;
    days: string;
    dates: string;
    times: string;
    class_type: string;
    location?: string;
    mode_of_instruction: string;
    professor_id?: string;
    professor_name?: string;
    course_title: string;
    department: string;
    course_number: string;
    satisfies_area?: string;
  }[];
}

const useSearchResults = (currentOption: string, currentQuery: string) => {
  const apiQueryParams = new URLSearchParams();
  apiQueryParams.set('search', currentQuery);
  apiQueryParams.set('limit', '3');
  const { data, error, isLoading } = useSWR<
    CourseResults & ProfessorResults & ScheduleResults
  >(
    process.env.NEXT_PUBLIC_BASE_API_URL +
      `/core/${currentOption}/search?${apiQueryParams.toString()}`,
    fetcher,
  );
  return { data, error, isLoading };
};

export const NavSearchBar: React.FC = () => {
  const searchParams = useSearchParams();
  const urlQueryParams = new URLSearchParams(searchParams);
  const currentOption = urlQueryParams.get('navOption') ?? 'courses';
  const currentQuery = urlQueryParams.get('navQuery') ?? '';
  const { data, error, isLoading } = useSearchResults(
    currentOption,
    currentQuery,
  );
  return (
    <form action={`/${currentOption}/search`} className="relative">
      <SearchBar
        param="navQuery"
        shouldResetPageOnChange={false}
        className="peer [&>input]:!rounded-r-none"
      />
      <ParamSelect
        param="navOption"
        shouldResetPageOnChange={false}
        className="rounded-l-none border-border bg-background"
      >
        <option value="courses">Courses</option>
        <option value="professors">Professors</option>
        <option value="schedules">Schedules</option>
      </ParamSelect>
      <Card className="absolute left-0 top-[50px] block w-[500px] max-w-[100dvw] peer-has-[:placeholder-shown]:hidden">
        <menu>
          {isLoading ? (
            <li className="mx-auto my-8 w-fit">Loading...</li>
          ) : null}
          {error ? (
            <li className="mx-auto my-8 w-fit text-important">
              Error: {error.message}
            </li>
          ) : null}
          {data && data.total_results === 0 ? (
            <li className="mx-auto my-8 w-fit">No results found</li>
          ) : null}
          {data && data.total_results > 0
            ? currentOption === 'courses'
              ? data.filters.courses
                  .sort((a, b) => b.sml - a.sml)
                  .map((course, i) => (
                    <li
                      key={i}
                      className="border-b-2 border-border last:border-b-0"
                    >
                      <Link
                        href={`/courses/${course.department}-${course.course_number}`}
                        className="flex flex-col px-lg py-md animation hover:bg-[rgb(var(--color-primary)/0.15)] focus:bg-[rgb(var(--color-primary)/0.15)]"
                      >
                        <span className="overflow-ellipsis text-small-lg text-neutral">
                          {course.department} {course.course_number}
                        </span>
                        <span className="overflow-ellipsis text-p font-bold">
                          {course.name}
                        </span>
                      </Link>
                    </li>
                  ))
              : currentOption === 'professors'
              ? data.courses
                  .sort((a, b) => b.search_results - a.search_results)
                  .map((professor, i) => (
                    <li
                      key={i}
                      className="border-b-2 border-border last:border-b-0"
                    >
                      <Link
                        href={`/professors/${professor.email.split('@')[0]}`}
                        className="flex flex-col px-lg py-md animation hover:bg-[rgb(var(--color-primary)/0.15)] focus:bg-[rgb(var(--color-primary)/0.15)]"
                      >
                        <span className="overflow-ellipsis text-small-lg text-neutral">
                          {professor.email}
                        </span>
                        <span className="overflow-ellipsis text-p font-bold">
                          {professor.name}
                        </span>
                      </Link>
                    </li>
                  ))
              : data.schedules.map((schedule, i) => (
                  <li
                    key={i}
                    className="border-b-2 border-border last:border-b-0"
                  >
                    <Link
                      href={`courses/${schedule.department}-${schedule.course_number}`}
                      className="flex flex-col px-lg py-md animation hover:bg-[rgb(var(--color-primary)/0.15)] focus:bg-[rgb(var(--color-primary)/0.15)]"
                    >
                      <span className="overflow-ellipsis text-small-lg text-neutral">
                        {schedule.department} {schedule.course_number} -{' '}
                        {schedule.section}
                      </span>
                      <span className="overflow-ellipsis text-p font-bold">
                        {schedule.course_title}
                      </span>
                      <span className="overflow-ellipsis text-small-sm text-neutral">
                        {schedule.term} {schedule.year} • {schedule.units} Units
                        • {schedule.class_type}{' '}
                        {schedule.satisfies_area
                          ? `• Satisfies ${schedule.satisfies_area}`
                          : ''}
                      </span>
                    </Link>
                  </li>
                ))
            : null}
        </menu>
      </Card>
    </form>
  );
};
