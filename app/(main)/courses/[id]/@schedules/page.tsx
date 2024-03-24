import PaginatedSchedules from '@/app/(main)/courses/[id]/@schedules/paginated-schedules';
import {
  CourseSchedulesRouteParams,
  CourseSchedulesRouteResponse,
} from '@/types/api/course/schedules';
import fakeFetch from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialPaginatedSchedules = await fakeFetch<
    CourseSchedulesRouteResponse,
    CourseSchedulesRouteParams
  >({
    endpoint: '/course/schedules',
    params: { itemsPerPage: 4, page: 0, courseId: params.id },
    timeout: 2000,
  });

  return (
    <PaginatedSchedules
      courseId={params.id}
      initialPaginatedItems={initialPaginatedSchedules}
    />
  );
}
