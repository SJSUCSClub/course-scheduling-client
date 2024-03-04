import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import React from 'react';

import {
  GradeType,
  PercentageType,
  RatingType,
  ScheduleType,
} from '@/utils/types';
import RatingSummary from '@/components/rating-summary';
import SectionLabel from '@/components/section-label';
import Schedule from '@/components/schedule/schedule';
import Dropdown from '@/components/forms/dropdown';
import Breadcrumb from '@/components/breadcrumb';
import LineChart from '@/components/line-chart';
import InfoCard from '@/components/info-card';
import BarChart from '@/components/bar-chart';
import Button from '@/components/button';
import getColor from '@/utils/get-color';
import Tag from '@/components/tag';

const rating: RatingType = 2.6;
const name = 'Jahan Ghofraniha';
const reviewCount = 47;
const email = 'YqVp3@example.com';
const grade: GradeType = 'A-';
const wouldTakeAgain: PercentageType = 52;
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
const schedules: ScheduleType[] = [
  {
    course: 'CMPE 132',
    section: '02',
    name: 'Information Security',
    enrollment: '10/34',
    satisfies: 'GE: A',
    units: 3,
    type: 'Lab',
    startDate: 'August 19, 2002',
    endDate: 'Dec 20, 2002',
    days: new Set(['M', 'W']),
    times: '9:00 AM - 10:15 AM',
    location: 'In Person - ENGR227',
    avgGrade: 'C-',
    avgOverallRating: 2,
    number: '23105',
  },
  {
    course: 'CMPE 180A',
    section: '01',
    name: 'Software Engineering I',
    enrollment: '33/34',
    satisfies: 'GE: A',
    units: 3,
    type: 'Lab',
    startDate: 'August 19, 2002',
    endDate: 'Dec 20, 2002',
    days: new Set(['M', 'W']),
    times: '9:00 AM - 10:15 AM',
    location: 'In Person - ENGR227',
    avgGrade: 'A+',
    avgOverallRating: 4.5,
    number: '23105',
  },
  {
    course: 'CMPE 180B',
    section: '01',
    name: 'Software Engineering II',
    enrollment: '34/34',
    satisfies: 'GE: A',
    units: 3,
    type: 'Lab',
    startDate: 'August 19, 2002',
    endDate: 'Dec 20, 2002',
    days: new Set(['M', 'W']),
    times: '9:00 AM - 10:15 AM',
    location: 'In Person - ENGR227',
    avgGrade: 'F',
    avgOverallRating: 1,
    number: '23105',
  },
];

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
        <RatingSummary
          reviewCount={reviewCount}
          name={name}
          rating={rating}
          email={email}
          className="flex-1"
        />
        <div className="flex gap-[10px] lg:flex-col">
          <InfoCard
            type={getColor(grade)}
            icon={<ClipboardDocumentListIcon />}
            title={grade}
            subtitle="Average Grade"
          />
          <InfoCard
            type={getColor(wouldTakeAgain)}
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
          <BarChart chartData={ratingDistribution} className="flex-1" />
        </div>
        <div className="flex min-h-[464px] flex-1 flex-col rounded-lg px-[32px] py-[20px] default-border">
          <h3 className="flex h-[50px] items-center text-heading">
            Grading Distribution
          </h3>
          <LineChart chartData={gradeDistribution} className="flex-1" />
        </div>
      </div>

      <SectionLabel info="Statistics">Schedule</SectionLabel>
      {schedules.map((schedule, i) => (
        <Schedule key={i} {...schedule} />
      ))}

      <SectionLabel info="Statistics">{reviewCount} Reviews</SectionLabel>
    </main>
  );
}
