import PaginatedSchedules from '@/app/(main)/professors/[id]/@schedules/paginated-schedules';
import SectionLabel from '@/components/section-label';
import {
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/types/api/professor/schedules';
import fakeFetch from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialPaginatedSchedules = await fakeFetch<
    ProfessorSchedulesRouteResponse,
    ProfessorSchedulesRouteParams
  >({
    endpoint: '/professor/schedules',
    params: { itemsPerPage: 4, page: 0, professorId: Number(params.id) },
    timeout: 2000,
  });

  return (
    <PaginatedSchedules
      initialPaginatedItems={initialPaginatedSchedules}
      professorId={Number(params.id)}
    />
  );
}
