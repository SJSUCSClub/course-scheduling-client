import PaginatedReviews from '@/app/(main)/courses/[id]/@reviews/paginated-reviews';
import {
  CourseReviewsRouteParams,
  CourseReviewsRouteResponse,
  CourseReviewsRouteBody,
} from '@/types/api/course/reviews';
import fakeFetch from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialPaginatedItems = await fakeFetch<
    CourseReviewsRouteResponse,
    CourseReviewsRouteBody,
    CourseReviewsRouteParams
  >({
    endpoint: '/course/reviews',
    params: {
      itemsPerPage: 4,
      courseId: params.id,
      page: 0,
    },
    body: {
      filters: {},
    },
    timeout: 3000,
  });

  return (
    <PaginatedReviews
      courseId={params.id}
      initialPaginatedItems={initialPaginatedItems}
    />
  );
}
