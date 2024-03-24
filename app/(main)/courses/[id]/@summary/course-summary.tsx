import React from 'react';

import ChangeTypeDropdown from '@/app/(main)/professors/[id]/@summary/change-type-dropdown';
import Icon from '@/components/icon';
import Stars from '@/components/stars';
import Tag from '@/components/tag';
import getEvaluation from '@/utils/get-evaluation';
import { Square3Stack3DIcon } from '@heroicons/react/24/solid';

interface CourseSummaryProps {
  courseNumber: string;
  name: string;
  rating: number;
  totalReviews: number;
  department: string;
  units: string | undefined;
  description: string;
  prequisites: string[];
  satisfies: string[];
}

export const CourseSummary: React.FC<CourseSummaryProps> = ({
  satisfies,
  prequisites,
  description,
  units,
  department,
  courseNumber,
  name,
  rating,
  totalReviews,
}) => {
  return (
    <div className="flex flex-col gap-[10px] rounded-lg bg-background text-text">
      <div className="flex w-full flex-row items-start justify-between gap-[20px]">
        <div className="flex flex-col justify-start gap-[3px]">
          <h1 className="text-title">
            {department}
            {courseNumber}
          </h1>
          <p className="text-heading text-neutral">{name}</p>
        </div>

        <ChangeTypeDropdown />
      </div>

      <div
        className="flex h-[22px] items-center gap-[10px]"
        style={{
          color: `rgb(var(--color-${getEvaluation(rating, 'rating')}))`,
        }}
      >
        <p className="text-heading">{rating}</p>
        <div className="h-[22px] w-[130px]">
          <Stars rating={rating} />
        </div>
        <p className="text-caption">{totalReviews} reviews</p>
      </div>

      <div className="flex items-center gap-[5px] text-caption text-neutral">
        <Icon icon={<Square3Stack3DIcon />} h="15px" w="15px" />
        <p>Units: {units ? units : 'unknown'}</p>
      </div>

      <p className="py-[10px] text-body">{description}</p>

      <div className="flex items-center gap-[10px]">
        <p className="text-caption">Prequisites:</p>
        {prequisites.map((value, index) => (
          <Tag key={index} size="sm">
            {value}
          </Tag>
        ))}
      </div>
      <div className="flex items-center gap-[10px]">
        <p className="text-caption">Satisfies:</p>
        {satisfies.map((value, index) => (
          <Tag key={index} size="sm">
            {value}
          </Tag>
        ))}
      </div>
    </div>
  );
};
