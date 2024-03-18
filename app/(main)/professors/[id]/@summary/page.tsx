import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';

import {
  RatingSummaryBox,
  RatingSummaryBoxProvider,
} from '@/components/rating-summary';
import {
  ProfessorSummaryRouteParams,
  ProfessorSummaryRouteResponse,
} from '@/utils/types';
import ChangeTypeDropdown from '@/app/(main)/professors/[id]/@summary/change-type-dropdown';
import { BreadcrumbBox, BreadcrumbBoxProvider } from '@/components/breadcrumb';
import SectionLabel from '@/components/section-label';
import getEvaluation from '@/utils/get-evaluation';
import LineChart from '@/components/line-chart';
import InfoCard from '@/components/info-card';
import BarChart from '@/components/bar-chart';
import fakeFetch from '@/utils/fake-fetch';
import Button from '@/components/button';
import Tag from '@/components/tag';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type: string };
}) {
  const professorSummary: ProfessorSummaryRouteResponse | null =
    await fakeFetch<ProfessorSummaryRouteResponse, ProfessorSummaryRouteParams>(
      {
        endpoint: '/professor/summary',
        params: { id: Number(params.id) },
        timeout: 1000,
      },
    );

  if (!professorSummary) notFound();

  const {
    quality,
    ease,
    overall,
    grade,
    tags,
    id,
    name,
    email,
    overallDistribution,
    qualityDistribution,
    easeDistribution,
    gradeDistribution,
    totalReviews,
    takeAgain,
  } = professorSummary;

  const type = searchParams.type;

  return (
    <main className="flex flex-col gap-[10px] pb-[10px]">
      <BreadcrumbBoxProvider name={name}>
        <BreadcrumbBox className="flex w-full min-w-min py-[10px]" />
      </BreadcrumbBoxProvider>
      <div className="flex min-w-min gap-[10px] max-lg:flex-col">
        <RatingSummaryBoxProvider
          totalReviews={totalReviews}
          name={name}
          rating={
            type === 'quality' ? quality : type === 'ease' ? ease : overall
          }
          email={email}
        >
          <RatingSummaryBox className="flex-1" />
        </RatingSummaryBoxProvider>
        <div className="flex gap-[10px] lg:flex-col">
          <InfoCard
            type={grade ? getEvaluation(grade, 'grade') : 'default'}
            icon={<ClipboardDocumentListIcon />}
            title={grade ?? '-'}
            subtitle="Average Grade"
          />
          <InfoCard
            type={getEvaluation(takeAgain, 'percentage')}
            icon={<ArrowPathIcon />}
            title={`${takeAgain}%`}
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
            <ChangeTypeDropdown />
          </div>
          <div className="flex-1">
            <BarChart
              chartData={
                type === 'quality'
                  ? qualityDistribution
                  : type === 'ease'
                  ? easeDistribution
                  : overallDistribution
              }
            />
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
