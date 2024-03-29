'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import Button from '@/components/button';
import Tag from '@/components/tag';
import { CourseSearchRouteResponse } from '@/types/api/course/search';
import getEvaluation from '@/utils/get-evaluation';
import { Square2StackIcon, StarIcon } from '@heroicons/react/24/outline';

type CourseSearch = CourseSearchRouteResponse['items'][number];

const SearchResult: React.FC<CourseSearch> = ({
  department,
  courseNumber,
  name,
  takeAgain,
  totalReviews,
  professors,
  grade,
  overall,
}) => {
  const router = useRouter();
  return (
    <div className="flex min-w-min gap-[10px] rounded-lg p-[10px] default-border max-lg:w-full max-lg:flex-col">
      <div className="flex min-h-[100px] flex-1 gap-[20px]">
        <div className="flex flex-1 flex-col items-start justify-between gap-[12px] p-[10px]">
          <Link
            href={`/courses/${department.toLowerCase()}${courseNumber}`}
            className="flex flex-1 flex-col items-start gap-[3.75px]"
          >
            <h3 className="text-body-bold text-text hover:text-secondary hover:underline">
              {name}
            </h3>
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
              {totalReviews ? ' • ' + `${totalReviews} Review` : null}
            </p>
          </Link>

          <div className="flex w-full items-end justify-between gap-[20px]">
            <div className="flex flex-1 flex-col gap-[3.75px]">
              {professors.length ? (
                <label className="text-caption">Professors</label>
              ) : null}
              <div className="flex flex-wrap gap-[10px]">
                {professors.map((prof, i) => (
                  <form key={i} action={`/courses/search`}>
                    <input
                      hidden
                      name="professors"
                      defaultValue={JSON.stringify([prof])}
                    />
                    <Tag type="submit" size="sm">
                      {prof.name}
                    </Tag>
                  </form>
                ))}
              </div>
            </div>

            <div className="flex gap-[10px]">
              <Button variant={<StarIcon />} />
              <Button variant={<Square2StackIcon />} />
            </div>
          </div>
        </div>
      </div>

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
