'use client';

import clsx from 'clsx';
import dayjs from 'dayjs';

import Button from '@/components/button';
import Tag from '@/components/tag';
import { GenericReviewType } from '@/types/general';
import getCustomizableComponents from '@/utils/get-customizable-components';
import getEvaluation from '@/utils/get-evaluation';
import {
  BookmarkIcon,
  HeartIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface ReviewProps extends GenericReviewType {
  title: string;
}

const {
  Default: Review,
  Box: ReviewBox,
  BoxProvider: ReviewBoxProvider,
} = getCustomizableComponents<ReviewProps, React.HTMLProps<HTMLDivElement>>({
  box:
    ({
      id,
      content,
      createdAt,
      ease,
      quality,
      overall,
      grade,
      isUserAnonymous,
      tags,
      takeAgain,
      title,
      upvotes,
      userId,
      userName,
    }) =>
    ({ ...props }) => (
      <div
        {...props}
        className={clsx(
          '-:flex -:min-w-min -:rounded-lg -:p-[10px] -:default-border -:max-lg:w-full -:max-lg:flex-col -:lg:gap-[32px]',
          props.className,
        )}
      >
        <div className="flex flex-1 flex-col gap-[20px] p-[20px]">
          <div className="flex flex-1 flex-col gap-[12px]">
            {/* Heading */}
            <div className="w-full">
              <div className="flex w-full justify-between gap-[20px]">
                <h3 className="text-heading">{title}</h3>
                <p className="text-right text-subtitle text-neutral">
                  {dayjs(createdAt).format('MMMM D, YYYY').toUpperCase()}
                </p>
              </div>
              <p className="text-caption text-neutral">
                {isUserAnonymous ? 'Anonymous' : `By ${userName}`}
              </p>
            </div>

            {/* Ratings */}
            <div className="flex w-full flex-col gap-[8px]">
              <div className="flex w-full flex-col gap-[5px]">
                <div className="flex w-full items-center justify-between gap-[20px]">
                  <h3>Quality</h3>
                  <h3 className="text-body-bold">{quality}</h3>
                </div>
                <div className="h-[5px] w-full rounded-sm bg-border">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: `${quality * 20}%`,
                      backgroundColor: `rgb(var(--color-${getEvaluation(
                        quality,
                        'rating',
                      )}))`,
                    }}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-[5px]">
                <div className="flex w-full items-center justify-between gap-[20px]">
                  <h3>Ease</h3>
                  <h3 className="text-body-bold">{ease}</h3>
                </div>
                <div className="h-[5px] w-full rounded-sm bg-border">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: `${ease * 20}%`,
                      backgroundColor: `rgb(var(--color-${getEvaluation(
                        ease,
                        'rating',
                      )}))`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <p>
              {grade ? (
                <>
                  Grade:{' '}
                  <span
                    className="text-body-bold"
                    style={{
                      color: `rgb(var(--color-${getEvaluation(
                        grade,
                        'grade',
                      )}))`,
                    }}
                  >
                    {grade}
                  </span>
                  &nbsp;&nbsp;
                  <span className="text-neutral">•</span>
                  &nbsp;&nbsp;
                </>
              ) : null}
              Take Again:{' '}
              <span
                className={clsx('text-body-bold', {
                  'text-good': takeAgain,
                  'text-bad': !takeAgain,
                })}
              >
                {takeAgain ? 'Yes' : 'No'}
              </span>
            </p>

            <hr className="w-full text-border" />

            {/* Content */}
            <p>{content}</p>

            {/* Tags */}
            <div className="flex min-w-min flex-wrap gap-[10px] py-[10px]">
              {tags.map((tag, i) => (
                <Tag key={i} size="lg">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full items-end justify-between gap-[20px]">
            <div className="flex items-center gap-[5px] text-primary">
              <Button variant={<HeartIcon />} />
              <p className="text-button">{upvotes}</p>
            </div>
            <div className="flex items-center gap-[10px] text-primary">
              <Button variant={<PencilIcon />} />
              <Button variant={<TrashIcon />} />
              <Button variant={<ShareIcon />} />
              <Button variant={<BookmarkIcon />} />
            </div>
          </div>
        </div>

        <div
          className="flex w-[200px] flex-col items-center justify-center rounded-md bg-border py-[32px] max-lg:h-[200px] max-lg:w-full"
          style={{
            color: `rgb(var(--color-${getEvaluation(overall, 'rating')}))`,
          }}
        >
          <h3 className="text-subtitle">OVERALL</h3>
          <h2 className="text-rating">{overall}</h2>
        </div>
      </div>
    ),
  fallback: ({ children, ...props }) => (
    <div
      {...props}
      className={clsx(
        '-:flex -:min-w-min -:rounded-lg -:p-[10px] -:default-border -:max-lg:w-full -:max-lg:flex-col -:lg:gap-[32px]',
        props.className,
      )}
    >
      {children}
    </div>
  ),
});
export { ReviewBox, ReviewBoxProvider };
export default Review;
