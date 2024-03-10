import {
  ProfessorReviewsRouteResponse,
  response,
} from '@/app/mock-api/professor-reviews';
import SectionLabel from '@/components/section-label';
import { fakeFetch } from '@/utils/fake-fetch';

export default async function Page() {
  const { reviewCount }: ProfessorReviewsRouteResponse =
    await fakeFetch<ProfessorReviewsRouteResponse>(response, 3000);
  return <SectionLabel info="Statistics">{reviewCount} Reviews</SectionLabel>;
}
