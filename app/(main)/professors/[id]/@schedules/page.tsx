import {
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/app/mock-api/professor/schedules';
import PaginatedSchedules from '@/app/(main)/professors/[id]/@schedules/paginated-schedules';
import SectionLabel from '@/components/section-label';
import fakeFetch, { FetchParams } from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const initialFetchParams: FetchParams<ProfessorSchedulesRouteParams> = {
    endpoint: '/professor/schedules',
    params: { itemsPerPage: 4, page: 0, ...params },
    timeout: 2000,
  };
  const professorSchedules = await fakeFetch<
    ProfessorSchedulesRouteResponse,
    ProfessorSchedulesRouteParams
  >(initialFetchParams);

  return (
    <main className="flex flex-col gap-[10px] pb-[10px]">
      <SectionLabel info="Statistics">Schedule</SectionLabel>
      <PaginatedSchedules
        professorSchedules={professorSchedules}
        initialFetchParams={initialFetchParams}
      />
    </main>
  );
}
