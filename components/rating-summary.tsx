'use client';

import {
  BookmarkIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import React from 'react';
import clsx from 'clsx';

import { Popover, PopoverTrigger, PopoverBox } from '@/components/popover';
import { ButtonBoxProvider, ButtonBox } from '@/components/button';
import { RatingType } from '@/utils/types';
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

interface RatingSummaryBoxContextType extends RatingSummaryProps {}

const RatingSummaryBoxContext = React.createContext<
  RatingSummaryBoxContextType | undefined
>(undefined);

interface RatingSummaryBoxProviderProps extends RatingSummaryProps {
  children: React.ReactNode;
}

/**
 * This is the context provider for the `<RatingSummary />` component. It is used to provide props to it's children.
 * You can use this component along with `<RatingSummaryBox />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <RatingSummaryBoxProvider reviewCount={reviewCount} name={name} rating={rating} email={email}>
 *    <RatingSummaryBox className="w-full h-fit" />
 *  </RatingSummaryBoxProvider>
 * )
 */
export const RatingSummaryBoxProvider: React.FC<
  RatingSummaryBoxProviderProps
> = ({ children, ...props }) => (
  <RatingSummaryBoxContext.Provider value={props}>
    {children}
  </RatingSummaryBoxContext.Provider>
);

/**
 * This is a styled div element for the `<RatingSummary />` component.
 * You can use this component along with `<RatingSummaryBoxProvider />` to customize the attributes of the container.
 * @component
 * @example
 * return (
 *  <RatingSummaryBoxProvider reviewCount={reviewCount} name={name} rating={rating} email={email}>
 *    <RatingSummaryBox className="w-full h-fit" />
 *  </RatingSummaryBoxProvider>
 * )
 */
export const RatingSummaryBox: React.FC<React.HTMLProps<HTMLDivElement>> = (
  props,
) => {
  const context = React.useContext(RatingSummaryBoxContext);
  if (!context) {
    throw new Error(
      'RatingSummaryBox must be used within a RatingSummaryBoxProvider',
    );
  }
  const { reviewCount, name, rating, email } = context;
  return (
    <div
      {...props}
      className={clsx(
        '-:flex -:gap-[32px] -:rounded-lg -:bg-background -:p-[32px] -:text-text -:default-border -:lg:items-end',
        props.className,
      )}
    >
      <div className="flex flex-1 lg:hidden" />
      <p className="min-w-[100px] flex-1 text-caption max-lg:hidden">
        {reviewCount} Reviews
      </p>
      <div className="flex h-full flex-auto flex-col items-center justify-center gap-[3px]">
        <h1 className="text-center text-title">{name}</h1>
        <h2 className="text-rating">{rating}</h2>
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
  );
};

interface RatingSummaryProps {
  reviewCount: number;
  name: string;
  rating: RatingType;
  email: string;
}

/**
 * This is the default `<RatingSummary />` component.
 * @component
 * @example
 * return (
 *  <RatingSummary reviewCount={reviewCount} name={name} rating={rating} email={email} />
 * )
 */
const RatingSummary: React.FC<RatingSummaryProps> = (props) => (
  <RatingSummaryBoxProvider {...props}>
    <RatingSummaryBox />
  </RatingSummaryBoxProvider>
);

export default RatingSummary;
