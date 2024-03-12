import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import {
  RatingSummaryBox,
  RatingSummaryBoxProvider,
} from '@/components/rating-summary';
import {
  ProfessorSummaryRouteParams,
  ProfessorSummaryRouteResponse,
} from '@/app/mock-api/professor/summary';
import SectionLabel from '@/components/section-label';
import Dropdown from '@/components/forms/dropdown';
import LineChart from '@/components/line-chart';
import fakeFetch from '@/utils/fake-fetch';
import getEvaluation from '@/utils/get-color';
import BarChart from '@/components/bar-chart';
import InfoCard from '@/components/info-card';
import Button from '@/components/button';
import Tag from '@/components/tag';
import { BreadcrumbBox, BreadcrumbBoxProvider } from '@/components/breadcrumb';

export default async function Page({ params }: { params: { id: string } }) {
  const {
    rating,
    reviewCount,
    name,
    email,
    grade,
    wouldTakeAgain,
    tags,
    ratingDistribution,
    gradeDistribution,
  }: ProfessorSummaryRouteResponse = await fakeFetch<
    ProfessorSummaryRouteResponse,
    ProfessorSummaryRouteParams
  >({ endpoint: '/professor/summary', params, timeout: 1000 });

  return (
    <main className="flex flex-col gap-[10px] pb-[10px]">
      <BreadcrumbBoxProvider name={name}>
        <BreadcrumbBox className="flex w-full min-w-min py-[10px]" />
      </BreadcrumbBoxProvider>
      <div className="flex min-w-min gap-[10px] max-lg:flex-col">
        <RatingSummaryBoxProvider
          reviewCount={reviewCount}
          name={name}
          rating={rating}
          email={email}
        >
          <RatingSummaryBox className="flex-1" />
        </RatingSummaryBoxProvider>
        <div className="flex gap-[10px] lg:flex-col">
          <InfoCard
            type={getEvaluation(grade, 'grade')}
            icon={<ClipboardDocumentListIcon />}
            title={grade}
            subtitle="Average Grade"
          />
          <InfoCard
            type={getEvaluation(wouldTakeAgain, 'percentage')}
            icon={<ArrowPathIcon />}
            title={`${wouldTakeAgain}%`}
            subtitle="Would Take Again"
          />
        </div>
      </div>

      <div className="flex min-w-min flex-wrap justify-center gap-[10px]">
        {tags.map((tag) => (
          <Tag key={tag} size="lg">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="flex min-w-min flex-wrap justify-center gap-[10px] pt-[10px] text-button">
        <Button variant="primary" postfix={<ChevronRightIcon />}>
          Rate
        </Button>
        <Button variant="secondary" postfix={<ArrowTopRightOnSquareIcon />}>
          Compare Professor
        </Button>
      </div>

      <SectionLabel info="Statistics">Statistics</SectionLabel>
      <div className="flex gap-[10px] max-lg:flex-col">
        <div className="flex min-h-[464px] flex-1 flex-col rounded-lg px-[32px] py-[20px] default-border">
          <div className="flex justify-between">
            <h3 className="flex h-[50px] items-center text-heading">
              Rating Distribution
            </h3>
            <Dropdown
              options={['Overall', 'Quality', 'Ease']}
              values={['overall', 'quality', 'ease']}
            />
          </div>
          <div className="flex-1">
            <BarChart chartData={ratingDistribution} />
          </div>
        </div>
        <div className="flex min-h-[464px] flex-1 flex-col rounded-lg px-[32px] py-[20px] default-border">
          <h3 className="flex h-[50px] items-center text-heading">
            Grading Distribution
          </h3>
          <div className="flex-1">
            <LineChart chartData={gradeDistribution} />
          </div>
        </div>
      </div>
    </main>
  );
}
