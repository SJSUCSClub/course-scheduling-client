import { notFound } from 'next/navigation';

import { CourseSummary } from '@/app/(main)/courses/[id]/@summary/course-summary';
import BarChart from '@/components/bar-chart';
import { BreadcrumbBox, BreadcrumbBoxProvider } from '@/components/breadcrumb';
import Button from '@/components/button';
import InfoCard from '@/components/info-card';
import LineChart from '@/components/line-chart';
import SectionLabel from '@/components/section-label';
import Tag from '@/components/tag';
import {
  CourseSummaryRouteParams,
  CourseSummaryRouteResponse,
} from '@/types/api/course/summary';
import fakeFetch from '@/utils/fake-fetch';
import getEvaluation from '@/utils/get-evaluation';
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type: string };
}) {
  const courseSummary = await fakeFetch<
    CourseSummaryRouteResponse,
    CourseSummaryRouteParams
  >({ endpoint: '/course/summary', params: { id: Number(params.id) } });

  if (!courseSummary) notFound();

  const {
    department,
    courseNumber,
    satisfiesArea,
    prereqs,
    description,
    openSections,
    totalSections,
    totalReviews,
    name,
    units,
    quality,
    ease,
    grade,
    overall,
    qualityDistribution,
    gradeDistribution,
    easeDistribution,
    tags,
    takeAgain,
    overallDistribution,
  } = courseSummary;

  return (
    <main className="flex flex-col gap-[10px] p-[10px]">
      <BreadcrumbBoxProvider name={department + courseNumber}>
        <BreadcrumbBox className="flex w-full min-w-min py-[10px]" />
      </BreadcrumbBoxProvider>
      <div className="flex min-w-min flex-col gap-[10px]">
        <CourseSummary
          satisfies={satisfiesArea ? [satisfiesArea] : []}
          prequisites={prereqs ? [prereqs] : []}
          description={description ? description : ''}
          department={department}
          courseNumber={courseNumber}
          name={name}
          rating={
            searchParams.type == 'quality'
              ? quality
              : searchParams.type == 'ease'
              ? ease
              : overall
          }
          totalReviews={totalReviews}
          units={units}
        />

        <div className="flex gap-[10px] max-lg:flex-col">
          <InfoCard
            type="default"
            icon={<CalendarIcon />}
            title={`${openSections}/${totalSections}`}
            subtitle="Sections Open"
          />
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
        <Button variant="secondary" postfix={<ArrowTopRightOnSquareIcon />}>
          Compare Course
        </Button>
      </div>

      <SectionLabel info="Statistics">Statistics</SectionLabel>
      <div className="flex gap-[10px] max-lg:flex-col">
        <div className="flex min-h-[464px] flex-1 flex-col rounded-lg px-[32px] py-[20px] default-border">
          <h3 className="flex h-[50px] items-center text-heading">
            Rating Distribution
          </h3>
          <div className="flex-1">
            <BarChart
              chartData={
                searchParams.type === 'quality'
                  ? qualityDistribution
                  : searchParams.type === 'ease'
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
