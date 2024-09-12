import PaginatedReviews from '@/app/(main)/professors/[id]/@reviews/paginated-reviews';

export default async function Page({ params }: { params: { id: string } }) {
  return <PaginatedReviews professorId={params.id} />;
}
