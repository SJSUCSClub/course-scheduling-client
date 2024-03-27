'use client';

import React from 'react';

import Button from '@/components/button';
import Schedule from '@/components/schedule/schedule';
import SectionLabel from '@/components/section-label';
import usePaginatedItems from '@/hooks/use-paginated-items';
import useWrappedRequest from '@/hooks/use-wrapped-request';
import {
  CourseSchedulesRouteParams,
  CourseSchedulesRouteResponse,
} from '@/types/api/course/schedules';
import fakeFetch from '@/utils/fake-fetch';

const PaginatedSchedules: React.FC<{
  initialPaginatedItems: CourseSchedulesRouteResponse | null;
  courseId: string;
}> = ({ initialPaginatedItems, courseId }) => {
  const initialFetchRequest = (page: number) =>
    fakeFetch<CourseSchedulesRouteResponse, CourseSchedulesRouteParams>({
      endpoint: '/course/schedules',
      params: { itemsPerPage: 4, page: page, id: courseId },
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
        const { days, classType, professorId, name, section, ...rest } =
          schedule;
        return (
          <Schedule
            key={i}
            heading={`${name}`}
            subheading={`Section ${section}`}
            days={new Set(days)}
            additionalInfo={[classType]}
            href={`/professors/${professorId}`}
            {...rest}
            section={section}
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
    </section>
  );
};

export default PaginatedSchedules;
