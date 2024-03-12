'use client';

import { ProfessorReviewsRouteParams } from '@/app/mock-api/professor/reviews';
import {
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/app/mock-api/professor/schedules';
import Button from '@/components/button';
import Schedule from '@/components/schedule/schedule';
import usePaginatedItems from '@/hooks/use-paginated-items';
import { FetchParams } from '@/utils/fake-fetch';
import React from 'react';

const PaginatedSchedules: React.FC<{
  professorSchedules: ProfessorSchedulesRouteResponse;
  initialFetchParams: FetchParams<ProfessorSchedulesRouteParams>;
}> = ({ professorSchedules, initialFetchParams }) => {
  const { loading, error, isEndOfList, paginatedItems, loadMore } =
    usePaginatedItems<
      ProfessorSchedulesRouteResponse,
      ProfessorSchedulesRouteParams
    >(initialFetchParams, professorSchedules);

  return (
    <>
      {paginatedItems?.items.map((professorSchedule, i) => {
        const { course, section, name, days, ...rest } = professorSchedule;
        return (
          <Schedule
            key={i}
            heading={`${course} - ${section}`}
            subheading={name}
            days={new Set(days)}
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
