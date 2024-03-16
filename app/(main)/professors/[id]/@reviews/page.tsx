import {
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/utils/types';
import PaginatedReviews from '@/app/(main)/professors/[id]/@reviews/paginated-reviews';
import fakeFetch, { FetchParams } from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialFetchParams: FetchParams<ProfessorReviewsRouteParams> = {
    endpoint: '/professor/reviews',
    params: {
      itemsPerPage: 4,
      page: 0,
      sort: 'relevant',
      id: Number(params.id),
    },
    timeout: 3000,
  };
  const initialPaginatedReviews = await fakeFetch<
    ProfessorReviewsRouteResponse,
    ProfessorReviewsRouteParams
  >(initialFetchParams);
  return (
    <main className="flex flex-col gap-[10px] pb-[10px]">
      <PaginatedReviews
        initialPaginatedReviews={initialPaginatedReviews}
        initialFetchParams={initialFetchParams}
      />
    </main>
  );
}
