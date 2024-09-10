import { notFound } from 'next/navigation';

import ChangeTypeDropdown from '@/app/(main)/professors/[id]/@summary/change-type-dropdown';
import BarChart from '@/components/bar-chart';
import { BreadcrumbBox, BreadcrumbBoxProvider } from '@/components/breadcrumb';
import Button from '@/components/button';
import InfoCard from '@/components/info-card';
import LineChart from '@/components/line-chart';
import {
  RatingSummaryBox,
  RatingSummaryBoxProvider,
} from '@/components/rating-summary';
import SectionLabel from '@/components/section-label';
import Tag from '@/components/tag';
import {
  ProfessorSummaryRouteBody,
  ProfessorSummaryRouteParams,
  ProfessorSummaryRouteResponse,
} from '@/types/api/professor/summary';
import getEvaluation from '@/utils/get-evaluation';
import serverFetch from '@/utils/server-fetch';
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { sort: string };
}) {
  const professorSummary: ProfessorSummaryRouteResponse | null =
    await serverFetch<
      ProfessorSummaryRouteResponse,
      ProfessorSummaryRouteBody,
      ProfessorSummaryRouteParams
    >({
      endpoint: '/professors/summary',
      params: { id: params.id },
      timeout: 1000,
    });

  if (!professorSummary) notFound();

  const {
    avgQuality,
    avgEase,
    avgRating,
    avgGrade,
    tags,
    id,
    name,
    email,
    ratingDistribution,
    qualityDistribution,
    easeDistribution,
    gradeDistribution,
    totalReviews,
    takeAgainPercent,
  } = professorSummary;

  const type = searchParams.sort;

  return (
    <section className="flex flex-col gap-[10px] pb-[10px]">
      <BreadcrumbBoxProvider name={name}>
        <BreadcrumbBox className="flex w-full min-w-min py-[10px]" />
      </BreadcrumbBoxProvider>
      <div className="flex min-w-min gap-[10px] max-lg:flex-col">
        <RatingSummaryBoxProvider
          totalReviews={totalReviews}
          name={name}
          rating={
            type === 'quality'
              ? Math.round(avgQuality * 10) / 10
              : type === 'ease'
              ? Math.round(avgEase * 10) / 10
              : Math.round(avgRating * 10) / 10
          }
          email={email}
        >
          <RatingSummaryBox className="flex-1" />
        </RatingSummaryBoxProvider>
        <div className="flex gap-[10px] max-lg:flex-wrap lg:flex-col">
          <InfoCard
            type={avgGrade ? getEvaluation(avgGrade, 'grade') : 'default'}
            icon={<ClipboardDocumentListIcon />}
            title={avgGrade ?? '-'}
            subtitle="Average Grade"
          />
          <InfoCard
            type={getEvaluation(takeAgainPercent, 'percentage')}
            icon={<ArrowPathIcon />}
            title={`${takeAgainPercent}%`}
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
                  : ratingDistribution
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
    </section>
  );
}
