import PaginatedSchedules from '@/app/(main)/courses/[id]/@schedules/paginated-schedules';
import {
  CourseSchedulesRouteBody,
  CourseSchedulesRouteParams,
  CourseSchedulesRouteResponse,
} from '@/types/api/course/schedules';
import serverFetch from '@/utils/server-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const [department, courseNumber] = params.id.split('-');
  const initialPaginatedSchedules = await serverFetch<
    CourseSchedulesRouteResponse,
    CourseSchedulesRouteBody,
    CourseSchedulesRouteParams
  >({
    endpoint: '/courses/schedules',
    body: { limit: 3, page: 1 }, // backend is 1-indexed
    params: {
      department: department.toUpperCase(),
      courseNumber: courseNumber,
    },
    timeout: 2000,
  });

  return (
    <PaginatedSchedules
      department={department.toUpperCase()}
      courseNumber={courseNumber}
      initialPaginatedItems={initialPaginatedSchedules}
    />
  );
}
