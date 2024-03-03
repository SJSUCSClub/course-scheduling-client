'use client';

import {
  BookmarkIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import { Popover } from '@/components/popover';
import Button from '@/components/button';
import Stars from '@/components/stars';

interface RatingSummaryProps extends React.HTMLProps<HTMLDivElement> {
  reviewCount: number;
  name: string;
  rating: number;
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
  ...props
}) => {
  return (
    <div className="flex flex-1 items-end rounded-lg bg-background p-[32px] default-border">
      <p className="flex-1 text-caption text-text">{reviewCount} Reviews</p>
      <div className="flex h-full flex-auto flex-col items-center justify-center gap-[3px] text-text">
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
          <Popover.Trigger>
            <Button variant={<EllipsisVerticalIcon />} className="text-text" />
          </Popover.Trigger>
          <Popover.Content className="left-5 top-8 rounded-lg p-[32px] default-border">
            <Options />
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
};

export default RatingSummary;
