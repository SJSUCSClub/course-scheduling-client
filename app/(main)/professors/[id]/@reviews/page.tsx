'use client';

import { Btn, LinkBtn, Spinner, Textarea } from '@/components/atoms';
import { FilterGroup } from '@/components/molecules';
import { Review } from '@/components/organisms';
import { ProfessorsIDReviewsResponse } from '@/types';
import fetcher from '@/utils/fetcher';
import SessionProvider, { useSession } from '@/wrappers/session-provider';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { useSearchParams } from 'next/navigation';
import useSWRInfinite from 'swr/infinite';

const getKey =
  (id: string, params: string) =>
  (pageIndex: number, previousPageData: ProfessorsIDReviewsResponse) => {
    if (previousPageData && previousPageData.page === previousPageData.pages)
      return null;
    return `/django/core/professors/${id}/reviews?page=${pageIndex + 1}&${params}`;
  };

const Skeleton = () =>
  Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className="flex flex-1 animate-pulse flex-col items-stretch gap-md text-neutral"
    >
      <Review
        id="0"
        link="#"
        title="Loading..."
        name="---"
        createdAt={null}
        updatedAt={null}
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero ultricies lacinia. Nullam nec purus nec libero ultricies lacinia."
        quality={0}
        ease={0}
        grade={null}
        votes={{ upvotes: 0, downvotes: 0 }}
        userId={null}
        takeAgain={null}
        comments={null}
        tags={[]}
      />
    </div>
  ));

const WriteReview = ({ id }: { id: string }) => {
  const session = useSession();
  const isAuthenticated = session !== null;
  return isAuthenticated ? (
    <form action="/professors/review" className="flex gap-sm">
      <input type="hidden" name="professor_id" value={id} />
      <Textarea
        className="w-full"
        placeholder="Write a review..."
        name="review"
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
      to add a review.
    </span>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const requestParams = new URLSearchParams();
  requestParams.append('comments', 'true');
  requestParams.append('limit', searchParams.get('limit') ?? '3');
  searchParams
    .getAll('tags')
    .forEach((tag) => requestParams.append('tags', tag));

  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<ProfessorsIDReviewsResponse>(
      getKey(params.id, requestParams.toString()),
      fetcher,
    );
  if (error) throw error;
  const results = data ? data[0] : null;
  // TODO: Add has_reviewed to the response and check if the user has already reviewed the professor
  // const hasReviewed = results?.has_reviewed;
  const items = data ? data.flatMap((d) => d.items) : [];
  return (
    <section className="mx-auto flex w-full max-w-content-width items-stretch gap-md px-md pb-lg">
      <div className="w-[250px] max-lg:hidden">
        <div className="sticky top-0 flex min-h-[50dvh] w-full flex-col gap-sm pt-lg">
          <p className="pb-md">Filters</p>
          <p className="pb-sm text-small-lg">Limit</p>
          <FilterGroup
            variant="radio"
            param="limit"
            scrollTarget="reviews"
            values={['3', '10', '20', '50']}
            shouldResetPageOnChange={false}
          />
          <p className="pb-sm text-small-lg">Tags</p>
          <FilterGroup
            variant="checkbox"
            param="tags"
            scrollTarget="reviews"
            values={
              results?.filters.tags.flatMap((t) => t.tag) ??
              searchParams.getAll('tags')
            }
            shouldResetPageOnChange={false}
          />
        </div>
      </div>
      <SessionProvider>
        <div className="flex flex-1 flex-col items-stretch gap-md pt-lg">
          <p id="reviews">{results?.total_results ?? '-'} Review(s)</p>
          <WriteReview id={params.id} />
          {isLoading || isValidating ? <Skeleton /> : null}
          {!isLoading && !isValidating
            ? items.map((item, i) => (
                <Review
                  key={i}
                  link={`/courses/${item.department}-${item.course_number}`}
                  title={`${item.department} ${item.course_number}`}
                  name={item.name ?? item.username ?? 'Anonymous User'}
                  createdAt={item.created_at}
                  updatedAt={item.updated_at}
                  content={item.content}
                  quality={item.quality}
                  ease={item.ease}
                  grade={item.grade}
                  tags={item.tags}
                  takeAgain={item.take_again}
                  votes={item.votes}
                  comments={
                    item.comments
                      ? item.comments.map((comment) => ({
                          id: comment.id,
                          userId: comment.user_id,
                          name:
                            comment.name ??
                            comment.username ??
                            'Anonymous User',
                          createdAt: comment.created_at,
                          updatedAt: comment.updated_at,
                          content: comment.content,
                        }))
                      : null
                  }
                  userId={item.user_id}
                  id={item.id.toString()}
                />
              ))
            : null}
          {!isLoading && !isValidating && items.length === 0
            ? 'No reviews found.'
            : null}
          {size !== results?.pages || isLoading || isValidating ? (
            <div className="flex w-full justify-center pb-md">
              <Btn
                className="gap-md"
                variant="tertiary"
                disabled={isLoading || isValidating}
                onClick={() => setSize(size + 1)}
              >
                {size !== results?.pages ? 'Load more' : null}
                {isLoading || isValidating ? <Spinner /> : null}
              </Btn>
            </div>
          ) : null}
        </div>
      </SessionProvider>
    </section>
  );
}
