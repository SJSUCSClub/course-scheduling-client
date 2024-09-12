import PaginatedSchedules from '@/app/(main)/courses/[id]/@schedules/paginated-schedules';

export default async function Page({ params }: { params: { id: string } }) {
  const [department, courseNumber] = params.id.split('-');

  return (
    <PaginatedSchedules
      department={department.toUpperCase()}
      courseNumber={courseNumber}
    />
  );
}
