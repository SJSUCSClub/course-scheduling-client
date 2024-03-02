import {
  BookmarkIcon,
  EnvelopeIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

import Button from '@/components/button';
import Stars from '@/components/stars';

interface RatingSummaryProps extends React.HTMLProps<HTMLDivElement> {
  reviewCount: number;
  name: string;
  rating: number;
}

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
      <div className="flex flex-1 justify-end gap-[5px]">
        <Button variant={<EnvelopeIcon />} className="text-text" />
        <Button variant={<ShareIcon />} className="text-text" />
        <Button variant={<BookmarkIcon />} className="text-text" />
      </div>
    </div>
  );
};

export default RatingSummary;
