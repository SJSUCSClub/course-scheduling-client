'use client';

import Link from 'next/link';
import React from 'react';

import { ProfessorSearchRouteResponse } from '@/types/api/professor/search';
import getEvaluation from '@/utils/get-evaluation';

type ProfessorSearch = ProfessorSearchRouteResponse['items'][number];

const SearchResult: React.FC<ProfessorSearch> = ({
  id,
  name,
  //overall,
  //grade,
  //totalReviews,
  //takeAgain,
}) => {
  // TODO - get actual data for these
  const overall = 1;
  const grade = 'A';
  const totalReviews = -1;
  const takeAgain = 85.2;
  return (
    <div className="flex min-w-min gap-[10px] rounded-lg p-[10px] default-border max-lg:w-full max-lg:flex-col">
      <div className="flex min-h-fit flex-1 gap-[20px]">
        <div className="flex flex-1 flex-col items-start justify-between gap-[12px] p-[10px]">
          <Link
            href={`/professors/${id}`}
            className="flex flex-1 flex-col items-start gap-[3.75px]"
          >
            <h3 className="text-body-bold text-text hover:text-secondary hover:underline">
              {name}
            </h3>
            <p className="text-caption text-neutral">
              {grade ? (
                <>
                  <span
                    style={{
                      color: `rgb(var(--color-${getEvaluation(
                        grade,
                        'grade',
                      )}))`,
                    }}
                  >
                    {grade} Average Grade
                  </span>
                </>
              ) : (
                'No data'
              )}

              {takeAgain ? (
                <>
                  &nbsp;&nbsp;{'•'}&nbsp;&nbsp;
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
                </>
              ) : (
                'No data'
              )}
              {totalReviews ? (
                <>
                  &nbsp;&nbsp;{'•'}&nbsp;&nbsp;
                  <span>{totalReviews} Reviews</span>
                </>
              ) : null}
            </p>
          </Link>
        </div>
      </div>

      <div className="flex gap-[10px] max-lg:flex-wrap">
        <div className="flex h-auto min-w-[50px] flex-col items-center justify-center gap-[5px] p-[10px] text-caption max-lg:flex-1">
          {overall ? (
            <h3
              className="text-body-bold"
              style={{
                color: `rgb(var(--color-${getEvaluation(overall, 'rating')}))`,
              }}
            >
              {overall}
            </h3>
          ) : (
            <h3 className="text-body-bold text-neutral">-</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
