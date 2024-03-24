import PaginatedSchedules from '@/app/(main)/courses/[id]/@schedules/paginated-schedules';
import SectionLabel from '@/components/section-label';
import { CourseSchedulesRouteParams, CourseSchedulesRouteResponse } from '@/types/api/course/schedules';
import fakeFetch from '@/utils/fake-fetch';


export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const initialPaginatedSchedules = await fakeFetch<
  CourseSchedulesRouteResponse,
  CourseSchedulesRouteParams
>({
  endpoint: '/course/schedules',
  params: { itemsPerPage: 4, page: 0, courseId: params.id },
  timeout: 2000,
});

  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <SectionLabel info="Sessions">Courses in Session</SectionLabel>
      {/** Use a bunch of schedules */}
      <PaginatedSchedules courseId={params.id} initialPaginatedItems={initialPaginatedSchedules}/>
    </main>
  );
}
