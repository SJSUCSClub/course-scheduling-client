'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import React from 'react';
import clsx from 'clsx';

import { Popover, PopoverBox, PopoverTrigger } from '@/components/popover';
import { ButtonBox, ButtonBoxProvider } from '@/components/button';
import getEvaluation from '@/utils/get-color';
import { ScheduleType } from '@/utils/types';
import Icon from '@/components/icon';
import getCustomizableComponents from '@/utils/get-customizable-components';

const weekdays = ['M', 'T', 'W', 'R', 'F'];

interface ScheduleProps extends ScheduleType {}

const {
  Default: Schedule,
  Box: ScheduleBox,
  BoxProvider: ScheduleBoxProvider,
} = getCustomizableComponents<ScheduleProps, React.HTMLProps<HTMLDivElement>>({
  box:
    ({
      avgGrade,
      avgOverallRating,
      days,
      endDate,
      enrollment,
      heading,
      number,
      startDate,
      subheading,
      times,
      location,
      satisfies,
      type,
      units,
    }) =>
    ({ children, ...props }) => (
      <div
        {...props}
        className={clsx(
          '-:flex -:min-w-min -:gap-[10px] -:rounded-lg -:p-[10px] -:default-border -:max-lg:w-full -:max-lg:flex-col',
          props.className,
        )}
      >
        <div className="flex flex-1 flex-col items-start justify-between gap-[3.75px] p-[10px]">
          <div className="flex flex-col">
            <h3 className="text-body-bold text-text">{heading}</h3>
            <p className="text-subheading italic text-neutral">{subheading}</p>
          </div>
          <p className="text-caption text-neutral">
            <span
              style={{
                color: `rgb(var(--color-${getEvaluation(
                  enrollment,
                  'fraction',
                )}))`,
              }}
            >
              {enrollment} Enrolled
            </span>
            {satisfies ? ` • Satisfies ${satisfies}` : ''}
            {units ? ` • ${units} units` : ''}
            {type ? ` • ${type}` : ''}
          </p>
          <div className="flex w-full items-end justify-between gap-[10px] text-caption text-neutral">
            <div className="flex items-center gap-[10px]">
              <Icon icon={<CalendarIcon />} h="16px" w="16px" />
              <p>
                {startDate} - {endDate}
              </p>
            </div>
            <p>Nbr: {number}</p>
          </div>
        </div>

        <div className="flex gap-[10px]">
          <div className="flex h-auto flex-col justify-between gap-[5px] rounded-md bg-border p-[18px] text-caption">
            <div className="flex gap-[3px]">
              {weekdays.map((day) => (
                <p
                  key={day}
                  className={clsx(
                    'flex h-[22px] w-[22px] items-center justify-center rounded-sm bg-neutral text-[rgb(var(--color-border))]',
                    {
                      'bg-text font-bold': days.has(day),
                      'opacity-25': !days.has(day),
                    },
                  )}
                >
                  {day}
                </p>
              ))}
            </div>
            <div>
              <p className="font-bold">{times}</p>
              <p>{location}</p>
            </div>
          </div>

          <div className="flex h-auto min-w-[100px] flex-col items-center justify-center gap-[5px] rounded-md bg-border p-[20px] text-caption max-lg:flex-1">
            <h3
              className="text-title-bold"
              style={{
                color: `rgb(var(--color-${getEvaluation(avgGrade, 'grade')}))`,
              }}
            >
              {avgGrade}
            </h3>
          </div>
          <div className="flex h-auto min-w-[100px] flex-col items-center justify-center gap-[5px] rounded-md bg-border p-[20px] text-caption max-lg:flex-1">
            <h3
              className="text-title-bold"
              style={{
                color: `rgb(var(--color-${getEvaluation(
                  avgOverallRating,
                  'rating',
                )}))`,
              }}
            >
              {avgOverallRating}
            </h3>
          </div>
          <div className="relative flex h-auto items-center">
            <Popover>
              <PopoverTrigger>
                {({ toggleVisibility }) => (
                  <ButtonBoxProvider variant="tertiary">
                    <ButtonBox
                      onClick={toggleVisibility}
                      className="w-[8px] scale-150 p-0 text-neutral"
                    >
                      <EllipsisVerticalIcon viewBox="6.5 0 7 20" />
                    </ButtonBox>
                  </ButtonBoxProvider>
                )}
              </PopoverTrigger>
              <PopoverBox className="left-3">
                <div className="flex flex-col items-center gap-[16px]">
                  <ButtonBoxProvider variant="tertiary">
                    <ButtonBox className="w-max p-0 text-secondary">
                      Add to Schedule
                    </ButtonBox>
                  </ButtonBoxProvider>
                  <ButtonBoxProvider variant="tertiary">
                    <ButtonBox className="w-max p-0 text-secondary">
                      Compare
                    </ButtonBox>
                  </ButtonBoxProvider>
                  <ButtonBoxProvider variant="tertiary">
                    <ButtonBox className="w-max p-0 text-secondary">
                      View
                    </ButtonBox>
                  </ButtonBoxProvider>
                </div>
              </PopoverBox>
            </Popover>
          </div>
        </div>
      </div>
    ),
  fallback: ({ children, ...props }) => (
    <div
      {...props}
      className={clsx(
        '-:flex -:min-w-min -:gap-[10px] -:rounded-lg -:p-[10px] -:default-border -:max-lg:w-full -:max-lg:flex-col',
        props.className,
      )}
    >
      {children}
    </div>
  ),
});
export { ScheduleBox, ScheduleBoxProvider };
export default Schedule;
