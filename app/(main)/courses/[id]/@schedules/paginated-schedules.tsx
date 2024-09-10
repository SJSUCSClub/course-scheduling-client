'use client';

import React from 'react';

import Button from '@/components/button';
import Schedule from '@/components/schedule/schedule';
import SectionLabel from '@/components/section-label';
import usePaginatedItems from '@/hooks/use-paginated-items';
import useWrappedRequest from '@/hooks/use-wrapped-request';
import {
  CourseSchedulesRouteBody,
  CourseSchedulesRouteParams,
  CourseSchedulesRouteResponse,
} from '@/types/api/course/schedules';
import serverFetch from '@/utils/server-fetch';

const PaginatedSchedules: React.FC<{
  initialPaginatedItems: CourseSchedulesRouteResponse;
  department: string;
  courseNumber: string;
}> = ({ initialPaginatedItems, department, courseNumber }) => {
  const initialFetchRequest = (page: number) =>
    serverFetch<
      CourseSchedulesRouteResponse,
      CourseSchedulesRouteBody,
      CourseSchedulesRouteParams
    >({
      endpoint: '/courses/schedules',
      params: { department: department, courseNumber: courseNumber },
      body: { page: page, limit: 3 },
      timeout: 2000,
    });
  const { error, loading, wrappedRequest } = useWrappedRequest();
  const { isEndOfList, paginatedItems, loadMore } =
    usePaginatedItems<CourseSchedulesRouteResponse>({
      initialPaginatedItems,
      initialFetchRequest: (page: number) =>
        wrappedRequest(() => initialFetchRequest(page)),
    });

  return (
    <section className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <SectionLabel info="Sessions">Courses in Session</SectionLabel>

      {paginatedItems?.items.map((schedule, i) => {
        const {
          days,
          classType,
          professorId,
          professorName,
          section,
          ...rest
        } = schedule;
        return (
          <Schedule
            key={i}
            heading={`${professorName}`}
            subheading={`Section ${section}`}
            days={new Set(days)}
            additionalInfo={[classType]}
            href={`/professors/${professorId}`}
            {...rest}
            section={section}
            overall={0} // TODO - determine what to do here besides pass in hard value
          />
        );
      })}
      {!isEndOfList ? (
        <Button
          variant="tertiary"
          disabled={paginatedItems?.items.length === 0}
          onClick={loadMore}
          loading={loading}
        >
          {paginatedItems?.items.length !== 0 ? 'Show More' : 'No Schedules ;('}
        </Button>
      ) : null}
      {error && <p>{error.toString()}</p>}
    </section>
  );
};

export default PaginatedSchedules;
