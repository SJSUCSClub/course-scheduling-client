import PaginatedSchedules from '@/app/(main)/professors/[id]/@schedules/paginated-schedules';
import {
  ProfessorSchedulesRouteBody,
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/types/api/professor/schedules';
import serverFetch from '@/utils/server-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialPaginatedSchedules = await serverFetch<
    ProfessorSchedulesRouteResponse,
    ProfessorSchedulesRouteBody,
    ProfessorSchedulesRouteParams
  >({
    endpoint: '/professors/schedules',
    body: {
      limit: 3,
      page: 1,
    },
    params: { id: params.id },
    timeout: 2000,
  });

  return (
    <PaginatedSchedules
      initialPaginatedItems={initialPaginatedSchedules}
      professorId={params.id}
    />
  );
}
