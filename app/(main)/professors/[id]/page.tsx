import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import React from 'react';

import {
  email,
  grade,
  gradeDistribution,
  name,
  professorSchedules,
  rating,
  ratingDistribution,
  reviewCount,
  tags,
  wouldTakeAgain,
} from '@/data/professor';
import { ScheduleType } from '@/utils/types';
import {
  RatingSummaryBox,
  RatingSummaryBoxProvider,
} from '@/components/rating-summary';
import SectionLabel from '@/components/section-label';
import Schedule from '@/components/schedule/schedule';
import Dropdown from '@/components/forms/dropdown';
import Breadcrumb from '@/components/breadcrumb';
import LineChart from '@/components/line-chart';
import InfoCard from '@/components/info-card';
import BarChart from '@/components/bar-chart';
import getEvaluation from '@/utils/get-color';
import Button from '@/components/button';
import Tag from '@/components/tag';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  return {
    title: params.id,
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    notFound();
  }

  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <Breadcrumb className="flex w-full min-w-min py-[10px]" />

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
            type={getEvaluation(grade)}
            icon={<ClipboardDocumentListIcon />}
            title={grade}
            subtitle="Average Grade"
          />
          <InfoCard
            type={getEvaluation(wouldTakeAgain)}
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

      <SectionLabel info="Statistics">Schedule</SectionLabel>
      {professorSchedules.map((professorSchedule, i) => {
        const { course, section, name, ...rest } = professorSchedule;
        const schedule = {
          heading: `${course} - ${section}`,
          subheading: name,
          ...rest,
        } as ScheduleType;
        return <Schedule key={i} {...schedule} />;
      })}

      <SectionLabel info="Statistics">{reviewCount} Reviews</SectionLabel>
    </main>
  );
}
