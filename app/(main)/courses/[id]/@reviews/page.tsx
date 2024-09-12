import PaginatedReviews from '@/app/(main)/courses/[id]/@reviews/paginated-reviews';

export default async function Page({ params }: { params: { id: string } }) {
  const [department, courseNumber] = params.id.split('-');

  return (
    <PaginatedReviews
      department={department.toUpperCase()}
      courseNumber={courseNumber}
    />
  );
}
