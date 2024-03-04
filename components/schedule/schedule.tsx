'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { Popover } from '@/components/popover';
import { ScheduleType } from '@/utils/types';
import getColor from '@/utils/get-color';
import Button from '@/components/button';
import Icon from '@/components/icon';

interface ScheduleProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'name' | 'type'>,
    ScheduleType {}

const weekdays = ['M', 'T', 'W', 'R', 'F'];

const Schedule: React.FC<ScheduleProps> = ({
  course,
  section,
  name,
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
  ...props
}) => {
  return (
    <div
      {...props}
      className={`-:flex -:min-w-min -:gap-[10px] -:rounded-lg -:p-[10px] -:default-border -:max-lg:w-full -:max-lg:flex-col ${props.className}`}
    >
      <div className="flex flex-1 flex-col items-start justify-between gap-[3.75px] p-[10px]">
        <div className="flex flex-col">
          <h3 className="text-body-bold text-text">
            {course} - {section}
          </h3>
          <p className="text-subheading italic text-neutral">{name}</p>
        </div>
        <p className="text-caption text-neutral">
          <span style={{ color: `rgb(var(--color-${getColor(enrollment)}))` }}>
            {enrollment} Enrolled
          </span>{' '}
          • Satisfies {satisfies} • {units}
          units • {type}
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
            style={{ color: `rgb(var(--color-${getColor(avgGrade)}))` }}
          >
            {avgGrade}
          </h3>
        </div>
        <div className="flex h-auto min-w-[100px] flex-col items-center justify-center gap-[5px] rounded-md bg-border p-[20px] text-caption max-lg:flex-1">
          <h3
            className="text-title-bold"
            style={{ color: `rgb(var(--color-${getColor(avgGrade)}))` }}
          >
            {avgOverallRating}
          </h3>
        </div>
        <Popover className="relative flex h-auto items-center">
          <Popover.Trigger>
            <Button
              variant="tertiary"
              className="w-[8px] scale-150 p-0 text-neutral"
            >
              <EllipsisVerticalIcon viewBox="6.5 0 7 20" />
            </Button>
          </Popover.Trigger>
          <Popover.Content className="left-3">
            <div className="flex flex-col items-center gap-[16px]">
              <Button variant="tertiary" className="w-max p-0 text-secondary">
                Add to Schedule
              </Button>
              <Button variant="tertiary" className="w-max p-0 text-secondary">
                Compare Course
              </Button>
              <Button variant="tertiary" className="w-max p-0 text-secondary">
                View Course
              </Button>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
};

export default Schedule;
