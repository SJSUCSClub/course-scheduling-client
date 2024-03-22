import {
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/types/api/professor/schedules';
import PaginatedSchedules from '@/app/(main)/professors/[id]/@schedules/paginated-schedules';
import fakeFetch, { FetchParams } from '@/utils/fake-fetch';
import SectionLabel from '@/components/section-label';

export default async function Page({ params }: { params: { id: string } }) {
  const initialFetchParams: FetchParams<ProfessorSchedulesRouteParams> = {
    endpoint: '/professor/schedules',
    params: { itemsPerPage: 4, page: 0, professorId: Number(params.id) },
    timeout: 2000,
  };
  const initialPaginatedSchedules = await fakeFetch<
    ProfessorSchedulesRouteResponse,
    ProfessorSchedulesRouteParams
  >(initialFetchParams);

  return (
    <main className="flex flex-col gap-[10px] pb-[10px]">
      <SectionLabel info="Statistics">Schedule</SectionLabel>
      <PaginatedSchedules
        initialPaginatedSchedules={initialPaginatedSchedules}
        initialFetchParams={initialFetchParams}
      />
    </main>
  );
}
