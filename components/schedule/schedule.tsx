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

const weekdays = ['M', 'T', 'W', 'R', 'F'];

interface ScheduleBoxContextType extends ScheduleProps {}

const ScheduleBoxContext = React.createContext<
  ScheduleBoxContextType | undefined
>(undefined);

interface ScheduleBoxProviderProps extends ScheduleProps {
  children: React.ReactNode;
}

/**
 * This is the context provider for the `<Schedule />` component. It is used to provide props to it's children.
 * You can use this component along with `<ScheduleBox />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <ScheduleBoxProvider heading={heading} subheading={subheading}>
 *    <ScheduleBox className="w-full h-fit" />
 *  </ScheduleBoxProvider>
 * )
 */
export const ScheduleBoxProvider: React.FC<ScheduleBoxProviderProps> = ({
  children,
  ...props
}) => (
  <ScheduleBoxContext.Provider value={props}>
    {children}
  </ScheduleBoxContext.Provider>
);

/**
 * This is a styled div element for the `<Schedule />` component.
 * You can use this component along with `<ScheduleBoxProvider />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <ScheduleBoxProvider heading={heading} subheading={subheading}>
 *    <ScheduleBox className="w-full h-fit" />
 *  </ScheduleBoxProvider>
 * )
 */
export const ScheduleBox: React.FC<React.HTMLProps<HTMLDivElement>> = (
  props,
) => {
  const context = React.useContext(ScheduleBoxContext);
  if (!context) {
    throw new Error('ScheduleBox must be used within a ScheduleBoxProvider');
  }
  const {
    heading,
    subheading,
    enrollment,
    satisfies,
    units,
    type,
    startDate,
    endDate,
    days,
    times,
    location,
    avgGrade,
    avgOverallRating,
    number,
  } = context;
  return (
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
            style={{ color: `rgb(var(--color-${getEvaluation(enrollment)}))` }}
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
            style={{ color: `rgb(var(--color-${getEvaluation(avgGrade)}))` }}
          >
            {avgGrade}
          </h3>
        </div>
        <div className="flex h-auto min-w-[100px] flex-col items-center justify-center gap-[5px] rounded-md bg-border p-[20px] text-caption max-lg:flex-1">
          <h3
            className="text-title-bold"
            style={{ color: `rgb(var(--color-${getEvaluation(avgGrade)}))` }}
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
  );
};

interface ScheduleProps extends ScheduleType {}

/**
 * This is the default `<Schedule />` component.
 * @component
 * @example
 * return (
 *  <Schedule heading={heading} subheading={subheading} enrollment={enrollment} satisfies={satisfies} units={units} type={type} startDate={startDate} endDate={endDate} days={days} times={times} location={location} avgGrade={avgGrade} avgOverallRating={avgOverallRating} number={number} />
 * )
 */
const Schedule: React.FC<ScheduleProps> = (props) => (
  <ScheduleBoxProvider {...props}>
    <ScheduleBox />
  </ScheduleBoxProvider>
);

export default Schedule;
