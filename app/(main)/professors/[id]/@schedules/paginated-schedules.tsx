'use client';

import React, { useState } from 'react';
import useSWR from 'swr';

import Button from '@/components/button';
import Schedule from '@/components/schedule/schedule';
import SectionLabel from '@/components/section-label';
import {
  ProfessorSchedulesRouteBody,
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/types/api/professor/schedules';
import { formatSearchParams } from '@/utils/fetches';

interface SchedulePageProps
  extends ProfessorSchedulesRouteParams,
    ProfessorSchedulesRouteBody {
  loadMore: () => void;
  isLastPage: boolean;
}
const SchedulePage: React.FC<SchedulePageProps> = ({
  loadMore,
  isLastPage,
  id,
  page,
  limit,
}) => {
  const { data, error } = useSWR<ProfessorSchedulesRouteResponse>([
    `/professors/${id}/schedules` + formatSearchParams({ page, limit }),
    { headers: { 'ngrok-skip-browser-warning': '***' } },
  ]);

  const noItemsAtAll = isLastPage && page === 1 && data?.items.length === 0;
  const noMoreItems = isLastPage && page === data?.pages;
  return (
    <>
      {data?.items.map((schedule, i) => {
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
            href={`/courses/${department}-${courseNumber}`}
            {...rest}
            // TODO - get real data for this
            overall={-1}
          />
        );
        {
          error && <p>{error.toString()}</p>;
        }
        {
          isLastPage ? (
            <Button
              variant="tertiary"
              disabled={noMoreItems}
              onClick={loadMore}
              loading={false}
            >
              {noItemsAtAll ? 'No Schedules ;(' : 'Show More'}
            </Button>
          ) : null;
        }
      })}
    </>
  );
};

const PaginatedSchedules: React.FC<{
  professorId: string;
}> = ({ professorId }) => {
  const [cnt, setCnt] = useState(1);
  const loadMore = () => setCnt(cnt + 1);
  const pages = [];
  for (let i = 1; i <= cnt; ++i) {
    pages.push(
      <SchedulePage
        page={i}
        limit={3}
        id={professorId}
        loadMore={loadMore}
        isLastPage={i === cnt}
        key={i}
      />,
    );
  }

  return (
    <section className="flex flex-col gap-[10px] pb-[10px]">
      <SectionLabel info="Statistics">Schedule</SectionLabel>
      {pages}
    </section>
  );
};

export default PaginatedSchedules;
