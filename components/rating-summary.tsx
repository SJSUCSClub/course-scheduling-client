'use client';

import clsx from 'clsx';
import React from 'react';

import { ButtonBox, ButtonBoxProvider } from '@/components/button';
import { Popover, PopoverBox, PopoverTrigger } from '@/components/popover';
import Stars from '@/components/stars';
import { ProfessorReviewsStatsRouteResponse } from '@/types/api/professor/reviews-stats';
import { ProfessorSummaryRouteResponse } from '@/types/api/professor/summary';
import { RatingType } from '@/types/general';
import getCustomizableComponents from '@/utils/get-customizable-components';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import {
  BookmarkIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

const Options: React.FC = () => {
  return (
    <>
      <ButtonBoxProvider variant={<EnvelopeIcon />}>
        <ButtonBox className="text-text" />
      </ButtonBoxProvider>
      <ButtonBoxProvider variant={<ShareIcon />}>
        <ButtonBox className="text-text" />
      </ButtonBoxProvider>
      <ButtonBoxProvider variant={<BookmarkIcon />}>
        <ButtonBox className="text-text" />
      </ButtonBoxProvider>
    </>
  );
};

interface RatingSummaryProps
  extends Pick<ProfessorSummaryRouteResponse, 'name' | 'email'>,
    Pick<ProfessorReviewsStatsRouteResponse, 'totalReviews'> {
  rating?: RatingType;
}

const {
  Default: RatingSummary,
  Box: RatingSummaryBox,
  BoxProvider: RatingSummaryBoxProvider,
} = getCustomizableComponents<
  RatingSummaryProps,
  React.HTMLProps<HTMLDivElement>
>({
  box:
    ({ email, name, rating, totalReviews }) =>
    ({ ...props }) => (
      <div
        {...props}
        className={clsx(
          '-:flex -:gap-[32px] -:rounded-lg -:bg-background -:p-[32px] -:text-text -:default-border -:lg:items-end',
          props.className,
        )}
      >
        <div className="flex flex-1 lg:hidden" />
        <p className="min-w-[100px] flex-1 text-caption max-lg:hidden">
          {totalReviews} Reviews
        </p>
        <div className="flex h-full flex-auto flex-col items-center justify-center gap-[3px]">
          <h1 className="text-center text-title">{name}</h1>
          {rating ? (
            <h2 className="text-rating">{rating}</h2>
          ) : (
            <h2 className="text-rating text-neutral">-</h2>
          )}
          <div className="h-[50px]">
            <Stars rating={rating} />
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-[5px] max-lg:hidden">
          <Options />
        </div>
        <div className="relative flex flex-1 items-start justify-end gap-[5px] lg:hidden">
          <Popover>
            <PopoverTrigger>
              {({ toggleVisibility }) => (
                <ButtonBoxProvider variant={<EllipsisVerticalIcon />}>
                  <ButtonBox onClick={toggleVisibility} className="text-text" />
                </ButtonBoxProvider>
              )}
            </PopoverTrigger>
            <PopoverBox className="left-5 top-8">
              <Options />
            </PopoverBox>
          </Popover>
        </div>
      </div>
    ),
  fallback: ({ children, ...props }) => (
    <div
      {...props}
      className={clsx(
        '-:flex -:gap-[32px] -:rounded-lg -:bg-background -:p-[32px] -:text-text -:default-border -:lg:items-end',
        props.className,
      )}
    >
      {children}
    </div>
  ),
});
export { RatingSummaryBox, RatingSummaryBoxProvider };
export default RatingSummary;
