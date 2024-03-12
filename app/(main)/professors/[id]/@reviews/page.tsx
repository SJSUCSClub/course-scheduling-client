import {
  ProfessorReviewsRouteResponse,
  ProfessorReviewsRouteParams,
} from '@/app/mock-api/professor/reviews';
import SectionLabel from '@/components/section-label';
import fakeFetch from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const { reviewCount, reviews } = await fakeFetch<
    ProfessorReviewsRouteResponse,
    ProfessorReviewsRouteParams
  >({
    endpoint: '/professor/reviews',
    params: { itemsPerPage: 4, page: 0, sort: 'relevant', ...params },
    timeout: 3000,
  });
  return <SectionLabel info="Statistics">{reviewCount} Reviews</SectionLabel>;
}
