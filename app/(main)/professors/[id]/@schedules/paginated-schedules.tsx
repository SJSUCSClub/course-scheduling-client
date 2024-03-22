'use client';

import React from 'react';

import {
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/types/api/professor/schedules';
import usePaginatedItems, {
  UsePaginatedItemsProps,
} from '@/hooks/use-paginated-items';
import Schedule from '@/components/schedule/schedule';
import Button from '@/components/button';
import useWrappedRequest from '@/hooks/use-wrapped-request';
import fakeFetch from '@/utils/fake-fetch';

const PaginatedSchedules: React.FC<{
  initialPaginatedItems: ProfessorSchedulesRouteResponse | null;
  professorId: number;
}> = ({ initialPaginatedItems, professorId }) => {
  const initialFetchRequest = (page: number) =>
    fakeFetch<ProfessorSchedulesRouteResponse, ProfessorSchedulesRouteParams>({
      endpoint: '/professor/schedules',
      params: { itemsPerPage: 4, page: page, professorId: professorId },
      timeout: 2000,
    });
  const { error, loading, wrappedRequest } = useWrappedRequest();
  const { isEndOfList, paginatedItems, loadMore } =
    usePaginatedItems<ProfessorSchedulesRouteResponse>({
      initialPaginatedItems,
      initialFetchRequest: (page: number) =>
        wrappedRequest(() => initialFetchRequest(page)),
    });

  return (
    <>
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
          professorId,
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
            {...rest}
          />
        );
      })}
      {!isEndOfList ? (
        <Button variant="tertiary" onClick={loadMore} loading={loading}>
          Show More
        </Button>
      ) : null}
    </>
  );
};

export default PaginatedSchedules;
