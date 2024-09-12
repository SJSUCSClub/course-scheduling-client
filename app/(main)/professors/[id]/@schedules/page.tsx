import PaginatedSchedules from '@/app/(main)/professors/[id]/@schedules/paginated-schedules';

export default async function Page({ params }: { params: { id: string } }) {
  return <PaginatedSchedules professorId={params.id} />;
}
