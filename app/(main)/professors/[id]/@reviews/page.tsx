import PaginatedReviews from '@/app/(main)/professors/[id]/@reviews/paginated-reviews';
import {
  ProfessorReviewsRouteBody,
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/types/api/professor/reviews';
import fakeFetch from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialPaginatedSchedules = await fakeFetch<
    ProfessorReviewsRouteResponse,
    ProfessorReviewsRouteBody,
    ProfessorReviewsRouteParams
  >({
    endpoint: '/professor/reviews',
    params: {
      itemsPerPage: 4,
      page: 0,
      id: Number(params.id),
    },
    body: {
      filters: {
        sort: 'relevant',
      },
    },
    timeout: 3000,
  });
  return (
    <PaginatedReviews
      initialPaginatedItems={initialPaginatedSchedules}
      professorId={Number(params.id)}
    />
  );
}
