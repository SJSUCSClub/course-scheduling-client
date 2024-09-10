import PaginatedReviews from '@/app/(main)/professors/[id]/@reviews/paginated-reviews';
import {
  ProfessorReviewsRouteBody,
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/types/api/professor/reviews';
import serverFetch from '@/utils/server-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialPaginatedSchedules = await serverFetch<
    ProfessorReviewsRouteResponse,
    ProfessorReviewsRouteBody,
    ProfessorReviewsRouteParams
  >({
    endpoint: '/professors/reviews',
    params: {
      id: params.id,
    },
    body: {
      page: 1,
      limit: 3,
    },
    timeout: 3000,
  });
  return (
    <PaginatedReviews
      initialPaginatedItems={initialPaginatedSchedules}
      professorId={params.id}
    />
  );
}
