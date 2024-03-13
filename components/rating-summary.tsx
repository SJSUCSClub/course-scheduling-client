'use client';

import {
  BookmarkIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import React from 'react';
import clsx from 'clsx';

import getCustomizableComponents from '@/utils/get-customizable-components';
import { Popover, PopoverTrigger, PopoverBox } from '@/components/popover';
import { ProfessorSummaryRouteResponse, RatingType } from '@/utils/types';
import { ButtonBoxProvider, ButtonBox } from '@/components/button';
import Stars from '@/components/stars';

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
  extends Pick<
    ProfessorSummaryRouteResponse,
    'totalReviews' | 'name' | 'email'
  > {
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
    ({ children, ...props }) => (
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
