import { Card } from '@/components/atoms';
import { ProfessorsMostVisitedResponse } from '@/types';
import { cn } from '@/utils/cn';
import getEvaluation from '@/utils/get-evaluation';
import Link from 'next/link';

export default async function Page() {
  const data: ProfessorsMostVisitedResponse = await fetch(
    process.env.BASE_API_URL + '/core/professors/most_visited',
  ).then((resp) => resp.json());

  return (
    <>
      <div className="py-lg text-h2-mobile lg:text-h2-desktop">
        🔥<span className="text-primary">Hot</span> Professors
      </div>

      <div className="flex flex-row justify-around">
        {data.most_visited.map(
          ({ name, id, avg_rating, visits, total_reviews }) => (
            <Card key={id} className="h-[300px] w-[300px]">
              <Link
                href={`/professors/${id}`}
                className="flex h-full w-full flex-col justify-center p-md"
              >
                <div className="flex flex-col pb-sm">
                  <div className="text-center text-h4-mobile text-text lg:text-h4-desktop">
                    {name}
                  </div>
                  <div className="text-center text-small-lg text-neutral">
                    {visits} views recently • {total_reviews} total reviews
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
