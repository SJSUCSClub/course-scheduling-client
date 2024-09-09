import PaginatedReviews from '@/app/(main)/courses/[id]/@reviews/paginated-reviews';
import {
  CourseReviewsResponse,
  CourseReviewsRouteBody,
  CourseReviewsRouteParams,
} from '@/types/api/course/reviews';
import serverFetch from '@/utils/server-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const [department, courseNumber] = params.id.split('-');
  const initialPaginatedItems = await serverFetch<
    CourseReviewsResponse,
    CourseReviewsRouteBody,
    CourseReviewsRouteParams
  >({
    endpoint: '/courses/reviews',
    params: {
      department: department.toUpperCase(),
      courseNumber: courseNumber,
    },
    body: {
      page: 1,
      limit: 3,
    },
    timeout: 3000,
  });

  return (
    <PaginatedReviews
      department={department.toUpperCase()}
      courseNumber={courseNumber}
      initialPaginatedItems={initialPaginatedItems}
    />
  );
}
