'use client';

import {
  BookmarkIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import { Popover } from '@/components/popover';
import { RatingType } from '@/utils/types';
import Button from '@/components/button';
import Stars from '@/components/stars';

interface RatingSummaryProps extends React.HTMLProps<HTMLDivElement> {
  reviewCount: number;
  name: string;
  rating: RatingType;
  email: string;
}

const Options: React.FC = () => {
  return (
    <>
      <Button variant={<EnvelopeIcon />} className="text-text" />
      <Button variant={<ShareIcon />} className="text-text" />
      <Button variant={<BookmarkIcon />} className="text-text" />
    </>
  );
};

const RatingSummary: React.FC<RatingSummaryProps> = ({
  reviewCount,
  name,
  rating,
  email,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`-:flex -:gap-[32px] -:rounded-lg -:bg-background -:p-[32px] -:text-text -:default-border -:lg:items-end ${props.className}`}
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
      <Popover className="relative flex flex-1 items-start justify-end gap-[5px] lg:hidden">
        <Popover.Trigger>
          <Button variant={<EllipsisVerticalIcon />} className="text-text" />
        </Popover.Trigger>
        <Popover.Content className="left-5 top-8">
          <Options />
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default RatingSummary;
