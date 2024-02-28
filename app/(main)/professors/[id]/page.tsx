import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';
import React from 'react';

import RatingSummary from '@/components/rating-summary';
import SectionLabel from '@/components/section-label';
import Breadcrumb from '@/components/breadcrumb';
import InfoCard from '@/components/info-card';
import Button from '@/components/button';
import Tag from '@/components/tag';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: params.id,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    notFound();
  }

  const rating = 2.6;
  const name = 'Jahan Ghofraniha';
  const reviewCount = 47;
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
  const email = 'YqVp3@example.com';

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

      {/* Schedule */}
      <SectionLabel info="Statistics">Schedule</SectionLabel>

      {/* Reviews */}
      <SectionLabel info="Statistics">{reviewCount} Reviews</SectionLabel>
    </main>
  );
}
