'use client';

import { Btn, Card } from '@/components/atoms';
import { ProfessorsSearchResponse } from '@/types';
import fetcher from '@/utils/fetcher';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';
import useSWRInfinite from 'swr/infinite';
const getKey =
  (startswith: string) =>
  (pageIndex: number, previousPageData: ProfessorsSearchResponse) => {
    if (previousPageData && previousPageData.page === previousPageData.pages)
      return null;
    return `/django/core/professors/search?startswith=${startswith}&page=${pageIndex + 1}&limit=3`;
  };

interface LastNameDisplayProps {
  startswith: string;
}
export const LastNameDisplay: React.FC<LastNameDisplayProps> = ({
  startswith,
}) => {
  const [active, setActive] = React.useState(false);
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<ProfessorsSearchResponse>(getKey(startswith), fetcher, {
      revalidateOnFocus: false,
    });
  if (error) {
    throw error;
  }
  const pages = data ? data[0].pages : 0;
  const items = data?.flatMap((d) => d.items) ?? [];
  return (
    <Card className="flex flex-col p-[20px]">
      {/** Render title and count **/}
      <div
        id={startswith}
        className="flex flex-row items-center gap-[20px]"
        onClick={() => setActive(!active)}
      >
        <div className="text-h3-mobile lg:text-h3-desktop">{startswith}</div>
        <div className="text-text">{data?.[0].total_results || 0} results</div>
        {active ? (
          <ChevronDownIcon className="h-4 w-4" />
        ) : (
          <ChevronRightIcon className="h-4 w-4" />
        )}
      </div>

      {/** Render items */}
      {active ? (
        <div className="flex flex-col gap-[20px] pt-md">
          <div className="flex flex-row flex-wrap justify-center gap-[20px] overflow-auto">
            {items.map((professor) => (
              <Card className="items-center" key={professor.id}>
                <Link
                  href={`/professors/${professor.id}`}
                  className="flex w-[250px] flex-col items-center py-md animation hover:bg-[rgb(var(--color-secondary)/0.15)] focus:bg-[rgb(var(--color-secondary)/0.15)]"
                >
                  <span className="overflow-ellipsis text-small-lg text-neutral">
                    {professor.email}
                  </span>
                  <span className="overflow-ellipsis text-p font-bold">
                    {professor.name}
                  </span>
                </Link>
              </Card>
            ))}
          </div>
          {size !== pages || isLoading || isValidating ? (
            <div className="flex justify-center">
              <Btn
                className="justify-end"
                variant="primary"
                onClick={() => setSize(size + 1)}
              >
                Load more
              </Btn>
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
};
