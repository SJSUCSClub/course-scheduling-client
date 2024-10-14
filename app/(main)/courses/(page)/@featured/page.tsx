export const revalidate = 3600; // revalidate at most once an hour

import { Card } from '@/components/atoms';
import { CoursesHighestRatedResponse } from '@/types';
import { cn } from '@/utils/cn';
import fetcher from '@/utils/fetcher';
import getEvaluation from '@/utils/get-evaluation';
import Link from 'next/link';

export default async function Page() {
  const data = (await fetcher(
    process.env.BASE_API_URL + '/core/courses/highest_rated',
  )) as CoursesHighestRatedResponse;

  return (
    <>
      <div className="py-lg text-h2-mobile lg:text-h2-desktop">
        <span className="text-primary">Top Rated</span> Courses
      </div>

      <div className="flex w-full flex-row flex-wrap items-center justify-around gap-[20px]">
        {data.highest_rated.map(
          ({ department, course_number, name, avg_rating, total_reviews }) => (
            <Card key={name} className="h-[150px] w-[300px] lg:h-[300px]">
              <Link
                href={`/courses/${department}-${course_number}`}
                className="flex h-full w-full flex-col justify-center p-md animation hover:bg-[rgb(var(--color-secondary)/0.15)] focus:bg-[rgb(var(--color-secondary)/0.15)]"
              >
                <div className="flex flex-col pb-sm">
                  <div className="text-center text-h4-mobile text-text lg:text-h4-desktop">
                    {name}
                  </div>
                  <div className="text-center text-small-lg text-neutral">
                    {total_reviews} total reviews
                  </div>
                </div>

                <div
                  className={cn(
                    `text-center text-h1-mobile-sm lg:text-h1-desktop-sm text-${getEvaluation(avg_rating || 0)}`,
                  )}
                >
                  {Math.round((avg_rating || 0) * 10) / 10} / 5
                </div>
              </Link>
            </Card>
          ),
        )}
      </div>
    </>
  );
}
