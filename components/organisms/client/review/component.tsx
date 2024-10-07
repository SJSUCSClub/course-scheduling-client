'use client';

import { Btn, Card, LinkBtn, Tag, Textarea } from '@/components/atoms';
import { cn } from '@/utils/cn';
import getEvaluation from '@/utils/get-evaluation';
import SessionProvider, { useSession } from '@/wrappers/session-provider';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbDownIcon as HandThumbDownIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
  FlagIcon as FlagIconSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useCookies } from 'react-cookie';

interface Props {
  id: string;
  userId: string | null;
  link: string;
  title: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  content: string;
  quality: number;
  ease: number;
  grade: string | null;
  tags: string[];
  takeAgain: boolean | null;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  comments:
    | {
        id: number;
        userId: string | null;
        name: string;
        createdAt: string;
        updatedAt: string | null;
        content: string;
      }[]
    | null;
  isShownInteractions?: boolean;
}

export const Review: React.FC<Props> = (props) => (
  <SessionProvider>
    <ReviewWithoutProviders {...props} />
  </SessionProvider>
);

export const ReviewWithoutProviders: React.FC<Props> = ({
  isShownInteractions = true,
  ...props
}) => {
  const session = useSession();
  const isAuthenticated = session !== null;
  const userId = session?.email.split('@')[0] ?? null;
  const router = useRouter();
  const isOwner =
    isAuthenticated && props.userId !== null && userId === props.userId;
  const [isShownComments, setIsShownComments] = React.useState(false);
  const toggleComments = () => setIsShownComments(!isShownComments);
  const [optimisticComments, setOptimisticComments] = React.useState<
    {
      id: number;
      userId: string | null;
      name: string;
      createdAt: string;
      updatedAt: string | null;
      content: string;
    }[]
  >([]);
  const [isUpvoted, setIsUpvoted] = React.useState(false);
  const [isDownvoted, setIsDownvoted] = React.useState(false);
  const [isFlagged, setIsFlagged] = React.useState(false);
  const [error, setError] = React.useState<boolean | null>(null);
  let quality = props.quality;
  if (typeof props.quality !== 'number') quality = parseInt(props.quality);
  let ease = props.ease;
  if (typeof props.ease !== 'number') ease = parseInt(props.ease);
  const rating = Math.round(((quality + ease) / 2) * 10) / 10;
  const [cookies] = useCookies(['csrftoken']);
  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const comment = formData.get('comment') as string;
    if (comment) {
      setOptimisticComments([
        ...optimisticComments,
        {
          id: optimisticComments.length + 1,
          userId: userId,
          name: `${session?.first_name} ${session?.last_name}`,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          content: comment,
        },
      ]);
      fetch('/django/core/users/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookies.csrftoken,
        },
        body: JSON.stringify({
          review_id: props.id,
          content: comment,
        }),
      }).then((res) => {
        if (!res.ok) {
          setError(true);
        }
      });
      e.currentTarget.reset();
    }
  };
  const handleUpvote = () => {
    // TODO: Implement upvote
    if (!isAuthenticated) {
      router.push('/django/google/authorize');
      return;
    }
    setIsUpvoted(!isUpvoted);
    setIsDownvoted(false);
  };
  const handleDownvote = () => {
    // TODO: Implement downvote
    if (!isAuthenticated) {
      router.push('/django/google/authorize');
      return;
    }
    setIsDownvoted(!isDownvoted);
    setIsUpvoted(false);
  };
  const handleDelete = () => {
    // TODO: Implement delete
  };
  const handleReport = () => {
    // TODO: Implement report
    if (!isAuthenticated) {
      router.push('/django/google/authorize');
      return;
    }
    setIsFlagged(!isFlagged);
  };
  const handleDeleteComment = () => {
    // TODO: Implement delete comment
  };
  return (
    <Card className="p-sm">
      <div className="flex gap-xl max-lg:flex-col">
        <div className="flex-1 p-md">
          <div>
            {/* Heading */}
            <div className="pb-md">
              <div className="flex items-center justify-between gap-md">
                <LinkBtn
                  className="rounded-sm p-0 text-inherit underline hover:text-secondary"
                  variant="tertiary"
                  href={props.link}
                >
                  {props.title}
                </LinkBtn>
                <p className="text-right text-small-lg font-bold uppercase text-neutral">
                  {props.updatedAt ? 'Updated at' : null}
                  {props.updatedAt
                    ? dayjs(props.updatedAt).format('MMM D, YYYY')
                    : props.createdAt
                      ? dayjs(props.createdAt).format('MMM D, YYYY')
                      : '--- -, ----'}
                </p>
              </div>
              <p className="text-small-sm text-neutral">{props.name}</p>
            </div>

            {/* Ratings */}
            <div className="flex w-full flex-col gap-sm pb-sm">
              <div className="flex w-full flex-col gap-xs">
                <div className="flex w-full items-center justify-between gap-md">
                  <p>Quality</p>
                  <p className="font-bold">{props.quality}</p>
                </div>
                <div className="h-xs w-full rounded-sm bg-border">
                  <div
                    className={cn('h-full rounded-sm', {
                      'bg-good':
                        getEvaluation(props.quality, 'rating') === 'good',
                      'bg-ok': getEvaluation(props.quality, 'rating') === 'ok',
                      'bg-bad':
                        getEvaluation(props.quality, 'rating') === 'bad',
                    })}
                    style={{
                      width: `${props.quality * 20}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-sm pb-md">
              <div className="flex w-full flex-col gap-xs">
                <div className="flex w-full items-center justify-between gap-md">
                  <p>Ease</p>
                  <p className="font-bold">{props.ease}</p>
                </div>
                <div className="h-xs w-full rounded-sm bg-border">
                  <div
                    className={cn('h-full rounded-sm', {
                      'bg-good': getEvaluation(props.ease, 'rating') === 'good',
                      'bg-ok': getEvaluation(props.ease, 'rating') === 'ok',
                      'bg-bad': getEvaluation(props.ease, 'rating') === 'bad',
                    })}
                    style={{
                      width: `${props.ease * 20}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Grade and Take Again */}
            <div className="flex flex-wrap items-center gap-sm pb-md">
              <p>
                Grade:{' '}
                {props.grade ? (
                  <span
                    className={cn('font-bold', {
                      'text-good':
                        getEvaluation(props.grade, 'grade') === 'good',
                      'text-ok': getEvaluation(props.grade, 'grade') === 'ok',
                      'text-bad': getEvaluation(props.grade, 'grade') === 'bad',
                    })}
                  >
                    {props.grade}
                  </span>
                ) : (
                  '-'
                )}
              </p>
              <p className="text-neutral">•</p>
              <p>
                Take again:{' '}
                {props.takeAgain !== null || props.takeAgain !== null ? (
                  <span
                    className={cn('font-bold', {
                      'text-good': props.takeAgain,
                      'text-bad': !props.takeAgain,
                    })}
                  >
                    {props.takeAgain ? 'Yes' : 'No'}
                  </span>
                ) : (
                  '-'
                )}
              </p>
            </div>

            {/* Break */}
            <hr className="pb-md" />

            {/* Content */}
            <p className="pb-lg">{props.content}</p>

            {/* Tags */}
            {props.tags.length > 0 ? (
              <div
                className={cn('flex min-w-min flex-wrap gap-md text-neutral', {
                  'pb-lg': isShownInteractions,
                })}
              >
                {props.tags.map((tag, i) => (
                  <Tag
                    key={i}
                    disabled
                    className="cursor-default whitespace-nowrap"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            ) : null}
          </div>

          {/* Interactions */}
          {isShownInteractions ? (
            <div className="flex items-center justify-between gap-md">
              <div className="flex gap-sm">
                <Btn
                  className="gap-sm rounded-sm p-0"
                  variant="tertiary"
                  onClick={handleUpvote}
                >
                  {isUpvoted ? (
                    <HandThumbUpIconSolid width={24} height={24} />
                  ) : (
                    <HandThumbUpIcon width={24} height={24} />
                  )}
                  {isUpvoted ? props.votes.upvotes + 1 : props.votes.upvotes}
                </Btn>
                <Btn
                  className="gap-sm rounded-sm p-0"
                  variant="tertiary"
                  onClick={handleDownvote}
                >
                  {isDownvoted ? (
                    <HandThumbDownIconSolid width={24} height={24} />
                  ) : (
                    <HandThumbDownIcon width={24} height={24} />
                  )}
                  {isDownvoted
                    ? props.votes.downvotes + 1
                    : props.votes.downvotes}
                </Btn>
              </div>
              <div className="flex gap-sm">
                {isOwner ? (
                  <>
                    <LinkBtn
                      className="gap-sm rounded-sm p-0"
                      variant="tertiary"
                      href={`/professors/review/${props.id}`}
                    >
                      <PencilIcon width={24} height={24} />
                    </LinkBtn>
                    <Btn
                      className="gap-sm rounded-sm p-0"
                      variant="tertiary"
                      popoverTarget="delete-review"
                    >
                      <TrashIcon width={24} height={24} />
                    </Btn>
                    <dialog
                      popover="auto"
                      id="delete-review"
                      className="bg-[#00000000] backdrop:bg-text backdrop:opacity-25"
                    >
                      <Card className="w-min p-md">
                        <p className="pb-sm font-bold">Delete Review</p>
                        <p>Are you sure you want to delete this review?</p>
                        <div className="flex w-full gap-sm pt-md">
                          <Btn
                            className="bg-important text-background"
                            variant="primary"
                            onClick={handleDelete}
                          >
                            Delete
                          </Btn>
                          <Btn
                            className="bg-background text-primary"
                            variant="primary"
                            popoverTarget="delete-review"
                          >
                            Cancel
                          </Btn>
                        </div>
                      </Card>
                    </dialog>
                  </>
                ) : null}
                <Btn
                  className="gap-sm rounded-sm p-0"
                  variant="tertiary"
                  onClick={toggleComments}
                >
                  {isShownComments ? (
                    <ChatBubbleOvalLeftIconSolid width={24} height={24} />
                  ) : (
                    <ChatBubbleOvalLeftIcon width={24} height={24} />
                  )}
                </Btn>
                <Btn
                  className="gap-sm rounded-sm p-0"
                  variant="tertiary"
                  onClick={handleReport}
                >
                  {isFlagged ? (
                    <FlagIconSolid width={24} height={24} />
                  ) : (
                    <FlagIcon width={24} height={24} />
                  )}
                </Btn>
              </div>
            </div>
          ) : null}
        </div>
        <div
          className={cn(
            'flex flex-col items-center justify-center rounded-md bg-border max-lg:p-lg lg:min-w-[200px] lg:p-xxl',
            {
              'text-good': getEvaluation(rating) === 'good',
              'text-ok': getEvaluation(rating) === 'ok',
              'text-bad': getEvaluation(rating) === 'bad',
              'text-neutral': props.id === '0',
            },
          )}
        >
          <p className="!font-bold max-lg:text-small-sm lg:text-small-lg">
            OVERALL
          </p>
          <p className="!font-extrabold max-lg:text-h1-mobile-lg lg:text-h1-desktop-lg">
            {props.id === '0' ? '-' : rating}
          </p>
        </div>
      </div>
      {isShownComments ? (
        <>
          {(props.comments && props.comments.length) ||
          optimisticComments.length ? (
            <div className="px-sm pt-md">
              {props.comments
                ? props.comments.map((comment, i) => (
                    <div className="flex flex-col gap-md" key={i}>
                      <hr />
                      <div className="flex items-center px-md pb-md">
                        <div className="flex-1">
                          <p>
                            <span className="font-bold">{comment.name}</span>{' '}
                            <span className="text-neutral">
                              {comment.updatedAt
                                ? `updated on ${dayjs(comment.updatedAt).format('MMMM D, YYYY')}`
                                : `commented on ${dayjs(comment.createdAt).format('MMMM D, YYYY')}`}
                            </span>
                          </p>
                          <p>{comment.content}</p>
                        </div>
                        {userId == comment.userId ? (
                          <div>
                            <Btn
                              className="gap-sm rounded-sm p-0"
                              variant="tertiary"
                              onClick={handleDeleteComment}
                            >
                              <TrashIcon width={24} height={24} />
                            </Btn>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))
                : null}
              {optimisticComments.map((comment, i) => (
                <div className="flex flex-col gap-md" key={i}>
                  <hr />
                  <div className="flex items-center px-md pb-md">
                    <div className="flex-1">
                      <p>
                        <span className="font-bold">{comment.name}</span>{' '}
                        <span className="text-neutral">
                          {comment.updatedAt
                            ? `updated on ${dayjs(comment.updatedAt).format('MMMM D, YYYY')}`
                            : `commented on ${dayjs(comment.createdAt).format('MMMM D, YYYY')}`}
                        </span>
                      </p>
                      <p>{comment.content}</p>
                    </div>
                    {userId == comment.userId ? (
                      <div>
                        <Btn
                          className="gap-sm rounded-sm p-0"
                          variant="tertiary"
                          onClick={handleDeleteComment}
                        >
                          <TrashIcon width={24} height={24} />
                        </Btn>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-sm py-md text-center">No comments yet.</p>
          )}
          {isAuthenticated ? (
            <form className="flex gap-sm pt-sm" onSubmit={handleAddComment}>
              <Textarea
                className="w-full"
                placeholder="Add your comment here..."
                name="comment"
              />
              <Btn
                className="rounded-md bg-background p-lg text-primary"
                variant="primary"
                type="submit"
              >
                <ChevronRightIcon width={24} height={24} />
              </Btn>
            </form>
          ) : (
            <span className="flex w-full items-center justify-center py-md">
              <LinkBtn
                variant="tertiary"
                className="w-fit px-sm"
                href="/django/google/authorize"
              >
                Log in
              </LinkBtn>{' '}
              to add a comment.
            </span>
          )}
        </>
      ) : null}
      {error ? (
        <p className="w-full p-md text-center text-important">
          There was an error making your request.
        </p>
      ) : null}
    </Card>
  );
};
