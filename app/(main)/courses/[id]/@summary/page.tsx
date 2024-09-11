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
  CourseSummaryRouteBody,
  CourseSummaryRouteParams,
  CourseSummaryRouteResponse,
} from '@/types/api/course/summary';
import { serverFetch } from '@/utils/fetches';
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
  searchParams: { sort: string };
}) {
  const [department, courseNumber] = params.id.split('-');
  const courseSummary = await serverFetch<
    CourseSummaryRouteResponse,
    CourseSummaryRouteBody,
    CourseSummaryRouteParams
  >({
    endpoint: '/courses/summary',
    params: {
      courseNumber: courseNumber,
      department: department,
    },
  });
  if (!courseSummary) notFound();

  const {
    satisfiesArea,
    prereqs,
    description,
    totalReviews,
    name,
    units,
    avgQuality,
    avgEase,
    avgGrade,
    avgRating,
    qualityDistribution,
    gradeDistribution,
    easeDistribution,
    tags,
    takeAgainPercent,
    ratingDistribution,
  } = courseSummary;
  // TODO - figure out what to do besides hardcode
  const openSections = 0;
  const totalSections = 0;

  const type = searchParams.sort;
  return (
    <section className="flex flex-col gap-[10px] p-[10px]">
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
            // round to 1 decimal place
            type == 'quality'
              ? Math.round(avgQuality * 10) / 10
              : type == 'ease'
              ? Math.round(avgEase * 10) / 10
              : Math.round(avgRating * 10) / 10
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
        {(tags || []).map((tag) => (
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
