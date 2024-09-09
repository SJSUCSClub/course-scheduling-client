'use client';

import React from 'react';

import Button from '@/components/button';
import Schedule from '@/components/schedule/schedule';
import SectionLabel from '@/components/section-label';
import usePaginatedItems from '@/hooks/use-paginated-items';
import useWrappedRequest from '@/hooks/use-wrapped-request';
import {
  ProfessorSchedulesBody,
  ProfessorSchedulesResponse,
  ProfessorSchedulesRouteParams,
} from '@/types/api/professor/schedules';
import serverFetch from '@/utils/server-fetch';

const PaginatedSchedules: React.FC<{
  initialPaginatedItems: ProfessorSchedulesResponse | null;
  professorId: string;
}> = ({ initialPaginatedItems, professorId }) => {
  const initialFetchRequest = (page: number) =>
    serverFetch<
      ProfessorSchedulesResponse,
      ProfessorSchedulesBody,
      ProfessorSchedulesRouteParams
    >({
      endpoint: '/professors/schedules',
      body: {
        page: page,
        limit: 3,
      },
      params: { id: professorId },
      timeout: 2000,
    });
  const { error, loading, wrappedRequest } = useWrappedRequest();
  const { isEndOfList, paginatedItems, loadMore } =
    usePaginatedItems<ProfessorSchedulesResponse>({
      initialPaginatedItems,
      initialFetchRequest: (page: number) =>
        wrappedRequest(() => initialFetchRequest(page)),
    });

  return (
    <section className="flex flex-col gap-[10px] pb-[10px]">
      <SectionLabel info="Statistics">Schedule</SectionLabel>
      {paginatedItems?.items.map((schedule, i) => {
        const {
          courseNumber,
          department,
          courseTitle,
          days,
          satisfiesArea,
          units,
          classType,
          courseId,
          ...rest
        } = schedule;
        return (
          <Schedule
            key={i}
            heading={`${department}${courseNumber} - ${rest.section}`}
            subheading={courseTitle}
            days={new Set(days)}
            additionalInfo={[
              `Satisfies ${satisfiesArea}`,
              `${units} units`,
              classType,
            ]}
            href={`/courses/${department}${courseNumber}`}
            {...rest}
            // TODO - get real data for this
            overall={-1}
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
