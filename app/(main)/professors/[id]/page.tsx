import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import React from 'react';

import RatingSummary from '@/components/rating-summary';
import SectionLabel from '@/components/section-label';
import Breadcrumb from '@/components/breadcrumb';
import InfoCard from '@/components/info-card';
import Button from '@/components/button';
import Tag from '@/components/tag';
import BarChart from '@/components/bar-chart';
import LineChart from '@/components/line-chart';
import Dropdown from '@/components/forms/dropdown';

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

  const rating = 2.6;
  const name = 'Jahan Ghofraniha';
  const reviewCount = 47;
  const email = 'YqVp3@example.com';
  const grade = 'A-';
  const wouldTakeAgain = '39%';
  const tags = [
    'Hilarious',
    'Respected',
    'Caring',
    'Amazing lectures',
    'Inspirational',
    'Accessible outside class',
    'Participation matters',
    'Graded by few things',
    'Clear grading criteria',
    'Get ready to read',
    'Lots of homework',
    'Tough grader',
  ];
  const ratingDistribution = [11, 5, 1, 7, 23];
  const gradeDistribution = [2, 15, 11, 20, 9];

  return (
    <main className="mx-auto flex max-w-[1076px] flex-col gap-[10px] p-[10px]">
      {/* Rating Summary */}
      <Breadcrumb className="flex py-[10px]" />
      <div className="flex gap-[10px] max-lg:flex-col">
        <RatingSummary
          reviewCount={reviewCount}
          name={name}
          rating={rating}
          className="flex-1"
        />
        <div className="flex gap-[10px] lg:flex-col">
          <InfoCard
            type="good"
            icon={<ClipboardDocumentListIcon />}
            title={grade}
            subtitle="Average Grade"
          />
          <InfoCard
            type="ok"
            icon={<ArrowPathIcon />}
            title={wouldTakeAgain}
            subtitle="Would Take Again"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-[10px]">
        {tags.map((tag) => (
          <Tag key={tag} size="lg">
            {tag}
          </Tag>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-[10px] pt-[10px] text-button">
        <Button variant="primary" postfix={<ChevronRightIcon />}>
          Rate
        </Button>
        <Button variant="secondary" postfix={<ArrowTopRightOnSquareIcon />}>
          Compare Professor
        </Button>
      </div>

      {/* Statistics */}
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
          <BarChart chartData={ratingDistribution} className="flex-1" />
        </div>
        <div className="flex min-h-[464px] flex-1 flex-col rounded-lg px-[32px] py-[20px] default-border">
          <h3 className="flex h-[50px] items-center text-heading">
            Grading Distribution
          </h3>
          <LineChart chartData={gradeDistribution} className="flex-1" />
        </div>
      </div>

      {/* Schedule */}
      <SectionLabel info="Statistics">Schedule</SectionLabel>

      {/* Reviews */}
      <SectionLabel info="Statistics">{reviewCount} Reviews</SectionLabel>
    </main>
  );
}
