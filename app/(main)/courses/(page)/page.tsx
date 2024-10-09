import { Card } from '@/components/atoms';
import { CoursesSearchResponse } from '@/types';
import Link from 'next/link';

export default async function Page() {
  const data: CoursesSearchResponse = await fetch(
    process.env.BASE_API_URL + '/core/courses/search',
  ).then((resp) => resp.json());

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const map: Map<string, { department: string; count: number }[]> = new Map();
  for (const letter of letters) {
    map.set(letter, []);
  }

  data.filters.departments.forEach(({ department, count }) =>
    map.get(department[0])?.push({ department, count }),
  );

  const components: {
    letter: string;
    departments: { department: string; count: number }[];
  }[] = [];
  map.forEach((value, key) => {
    if (value.length > 0) {
      components.push({ letter: key, departments: value });
    }
  });

  return (
    <main className="mx-auto w-full max-w-content-width px-md">
      <div className="py-lg text-h2-mobile lg:text-h2-desktop">Courses</div>

      <div className="flex flex-col gap-[20px]">
        {components.map(({ letter, departments }) => (
          <Card key={letter} className="flex flex-col gap-[20px] p-[20px]">
            <div className="flex flex-col items-center">
              <span className="text-h3-mobile lg:text-h3-desktop">
                {letter}
              </span>
              <span className="text-text">
                {departments.length} Departments
              </span>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-[20px]">
              {departments.map((department) => (
                <Card className="items-center" key={department.department}>
                  <Link
                    href={`/courses/search?department=${department.department}`}
                    className="flex w-[250px] flex-row items-center justify-between px-md py-md animation hover:bg-[rgb(var(--color-secondary)/0.15)] focus:bg-[rgb(var(--color-secondary)/0.15)]"
                  >
                    <span className="overflow-ellipsis text-p font-bold">
                      {department.department}
                    </span>
                    <span className="overflow-ellipsis text-small-lg text-neutral">
                      {department.count} Courses
                    </span>
                  </Link>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
