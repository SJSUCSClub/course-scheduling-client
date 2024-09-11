'use client';

import React, { useState } from 'react';
import useSWR from 'swr';

import Button from '@/components/button';
import Schedule from '@/components/schedule/schedule';
import SectionLabel from '@/components/section-label';
import { CourseSchedulesRouteResponse } from '@/types/api/course/schedules';

interface SchedulePageProps {
  loadMore: () => void;
  isLastPage: boolean;
  page: number;
  department: string;
  courseNumber: string;
  limit: number;
}
const SchedulePage: React.FC<SchedulePageProps> = ({
  loadMore,
  isLastPage,
  page,
  department,
  courseNumber,
  limit,
}) => {
  const { data, error, isLoading } = useSWR<CourseSchedulesRouteResponse>(
    `/api/core/courses/${department.toUpperCase()}-${courseNumber}/schedules?page=${page}&limit=${limit}`,
    (key: string) =>
      fetch(process.env.NEXT_PUBLIC_FRONTEND_URL + key, {
        headers: {
          'ngrok-skip-browser-warning': '***',
        },
      }).then((resp) => resp.json()),
  );

  // display data
  const noItemsAtAll = isLastPage && page === 1 && data?.items.length === 0;
  const noMoreItems = isLastPage && page === data?.pages;
  return (
    <>
      {data?.items.map((schedule, i) => {
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
      {error && <p>{error.toString()}</p>}
      {isLastPage ? (
        <Button
          variant="tertiary"
          disabled={noMoreItems}
          onClick={loadMore}
          loading={false}
        >
          {noItemsAtAll ? 'No Schedules ;(' : 'Show More'}
        </Button>
      ) : null}
    </>
  );
};

const PaginatedSchedules: React.FC<{
  department: string;
  courseNumber: string;
}> = ({ department, courseNumber }) => {
  const [cnt, setCnt] = useState(1);
  const loadMore = () => setCnt(cnt + 1);

  const pages = [];
  for (var i = 1; i <= cnt; ++i) {
    pages.push(
      <SchedulePage
        key={i}
        page={i}
        loadMore={loadMore}
        isLastPage={i === cnt}
        department={department}
        courseNumber={courseNumber}
        limit={3}
      />,
    );
  }

  return (
    <section className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <SectionLabel info="Sessions">Courses in Session</SectionLabel>

      {pages}
    </section>
  );
};

export default PaginatedSchedules;
