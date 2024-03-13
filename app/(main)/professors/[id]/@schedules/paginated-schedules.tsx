'use client';

import React from 'react';

import {
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/utils/types';
import usePaginatedItems from '@/hooks/use-paginated-items';
import Schedule from '@/components/schedule/schedule';
import { FetchParams } from '@/utils/fake-fetch';
import Button from '@/components/button';

const PaginatedSchedules: React.FC<{
  initialPaginatedSchedules: ProfessorSchedulesRouteResponse;
  initialFetchParams: FetchParams<ProfessorSchedulesRouteParams>;
}> = ({ initialPaginatedSchedules, initialFetchParams }) => {
  const { loading, error, isEndOfList, paginatedItems, loadMore } =
    usePaginatedItems<
      ProfessorSchedulesRouteResponse,
      ProfessorSchedulesRouteParams
    >(initialFetchParams, initialPaginatedSchedules);

  return (
    <>
      {paginatedItems?.items.map((professorSchedule, i) => {
        const {
          courseNumber,
          department,
          classType,
          courseTitle,
          units,
          satisfiesArea,
          days,
          ...rest
        } = professorSchedule;
        return (
          <Schedule
            key={i}
            heading={`${department}${courseNumber} - ${rest.section}`}
            subheading={courseTitle}
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
