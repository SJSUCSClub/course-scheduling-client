'use client';

import Link from 'next/link';
import React from 'react';

import Button from '@/components/button';
import Tag from '@/components/tag';
import { CourseSearchRouteResponse } from '@/types/api/course/search';
import getEvaluation from '@/utils/get-evaluation';
import { Square2StackIcon } from '@heroicons/react/24/outline';

type CourseSearch = CourseSearchRouteResponse['items'][number];

const SearchResult: React.FC<CourseSearch> = ({
  department,
  courseNumber,
  name,
  // takeAgain,
  // totalReviews,
  // professors,
  // grade,
  // overall,
  // totalSections,
  // openSections,
  units,
  satisfiesArea,
}) => {
  // TODO - put real values here
  const professors: any[] = [];
  const grade = 'A';
  const overall = 5;
  const takeAgain = 80.5;
  const totalReviews = 0;
  return (
    <div className="flex min-w-min gap-[10px] rounded-lg p-[10px] default-border max-lg:w-full max-lg:flex-col">
      {/** Info */}
      <div className="flex min-h-[100px] flex-1 flex-1 flex-col items-start justify-between p-[10px]">
        {/**Header */}
        <Link
          href={`/courses/${department.toUpperCase()}-${courseNumber}`}
          className="flex flex-1 flex-col items-start gap-[3px]"
        >
          <div>
            <h3 className="text-body-bold text-text hover:text-secondary hover:underline">
              {`${department.toUpperCase()} ${courseNumber}`}
            </h3>
            <p className="text-subheading italic text-neutral">{name}</p>
          </div>
          <p className="text-caption text-neutral">
            {takeAgain ? (
              <span
                style={{
                  color: `rgb(var(--color-${getEvaluation(
                    takeAgain,
                    'percentage',
                  )}))`,
                }}
              >
                {takeAgain}% Would Take Again
              </span>
            ) : (
              'No data'
            )}
            {` • `}
            <span
              style={{
                color: `rgb(var(--color-${getEvaluation(
                  // TODO - put real values here
                  (0 / 1) * 100,
                  'percentage',
                )}))`,
              }}
            >
              {/* TODO - put real values here */}
              {0}/{1} Open Sections
            </span>
            {totalReviews ? ' • ' + `${totalReviews} Review` : null}
            {units ? ` •  ${units} Units` : null}
          </p>
        </Link>

        {/** Actions */}
        <div className="flex w-full items-end justify-between">
          {/** Tags */}
          <div className="flex flex-col items-start pr-[10px]">
            {satisfiesArea ? (
              <div className="flex flex-1 flex-col gap-[5px] py-[10px]">
                <label className="text-caption">Satisfies</label>
                <div className="flex flex-wrap gap-[10px]">
                  <form action={'/courses/search'}>
                    <input
                      hidden
                      name="satisfies"
                      defaultValue={JSON.stringify([satisfiesArea])}
                    />
                    <Tag type="submit" size="sm">
                      {satisfiesArea}
                    </Tag>
                  </form>
                </div>
              </div>
            ) : null}
            <div className="flex flex-1 flex-col gap-[5px] py-[10px]">
              {professors.length ? (
                <label className="text-caption">Professors</label>
              ) : null}
              <div className="flex flex-wrap gap-[10px]">
                {professors.map((prof, i) => (
                  <form key={i} action={`/courses/search`}>
                    <input
                      hidden
                      name="professors"
                      defaultValue={JSON.stringify([prof.id])}
                    />
                    <Tag type="submit" size="sm">
                      {prof.name}
                    </Tag>
                  </form>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-[10px] py-[10px]">
            <Button variant={<Square2StackIcon />} />
          </div>
        </div>
      </div>
      {/** Grade and Rating */}
      <div className="flex gap-[10px] max-lg:flex-wrap">
        <div className="flex h-auto min-w-[100px] flex-col items-center justify-center gap-[5px] rounded-md bg-border p-[20px] text-caption max-lg:flex-1">
          {grade ? (
            <h3
              className="text-title-bold"
              style={{
                color: `rgb(var(--color-${getEvaluation(grade, 'grade')}))`,
              }}
            >
              {grade}
            </h3>
          ) : (
            <h3 className="text-title-bold text-neutral">-</h3>
          )}
        </div>
        <div className="flex h-auto min-w-[100px] flex-col items-center justify-center gap-[5px] rounded-md bg-border p-[20px] text-caption max-lg:flex-1">
          {overall ? (
            <h3
              className="text-title-bold"
              style={{
                color: `rgb(var(--color-${getEvaluation(overall, 'rating')}))`,
              }}
            >
              {overall}
            </h3>
          ) : (
            <h3 className="text-title-bold text-neutral">-</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
