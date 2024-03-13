import {
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
} from '@/utils/types';
import SectionLabel from '@/components/section-label';
import fakeFetch from '@/utils/fake-fetch';

export default async function Page({ params }: { params: { id: string } }) {
  const { totalReviews, items, page, itemsPerPage } = await fakeFetch<
    ProfessorReviewsRouteResponse,
    ProfessorReviewsRouteParams
  >({
    endpoint: '/professor/reviews',
    params: {
      itemsPerPage: 4,
      page: 0,
      sort: 'relevant',
      id: Number(params.id),
    },
    timeout: 3000,
  });
  return <SectionLabel info="Statistics">{totalReviews} Reviews</SectionLabel>;
}
