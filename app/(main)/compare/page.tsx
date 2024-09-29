import { Card, LinkBtn } from '@/components/atoms';
import { CompareItem, FilterGroup, SearchBar } from '@/components/molecules';
import { BarChart } from '@/components/organisms';
import {
  CoursesSearchResponse,
  ProfessorsIDReviewStatsResponse,
  ProfessorsSearchResponse,
} from '@/types';
import fetcher from '@/utils/fetcher';
import roundToTenth from '@/utils/round-to-tenth';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    compareQuery: string;
    courses: string | string[];
    professors: string | string[];
  };
}) {
  const requestParams = new URLSearchParams();
  searchParams.compareQuery &&
    requestParams.append('query', searchParams.compareQuery);
  requestParams.append('limit', '5');
  const { items: professors } = (await fetcher(
    process.env.BASE_API_URL +
      `/core/professors/search?${requestParams.toString()}`,
  )) as ProfessorsSearchResponse;
  const { items: courses } = (await fetcher(
    process.env.BASE_API_URL +
      `/core/courses/search?${requestParams.toString()}`,
  )) as CoursesSearchResponse;
  const selectedProfessors = Array.isArray(searchParams.professors)
    ? searchParams.professors
    : searchParams.professors
      ? [searchParams.professors]
      : [];
  const selectedCourses = Array.isArray(searchParams.courses)
    ? searchParams.courses
    : searchParams.courses
      ? [searchParams.courses]
      : [];
  const professorsValues = Array.from(
    new Set([
      ...selectedProfessors,
      ...(professors.map((professor) => professor.id) ?? []),
    ]),
  );
  const coursesValues = Array.from(
    new Set([
      ...selectedCourses,
      ...(courses.map(
        (course) => `${course.department}-${course.course_number}`,
      ) ?? []),
    ]),
  );
  const professorStats = await Promise.all(
    selectedProfessors.map(async (professor) => {
      const {
        total_reviews,
        avg_rating,
        avg_grade,
        take_again_percent,
        rating_distribution,
        grade_distribution,
      } = (await fetcher(
        process.env.BASE_API_URL +
          `/core/professors/${professor}/reviews-stats`,
      )) as ProfessorsIDReviewStatsResponse;
      const review = roundToTenth(avg_rating ?? 0);
      const takeAgainPercent = roundToTenth(take_again_percent ?? 0);
      return {
        id: professor,
        totalReviews: total_reviews,
        review,
        avgGrade: avg_grade,
        takeAgainPercent,
        ratingDistribution: rating_distribution,
        gradeDistribution: grade_distribution,
      };
    }),
  );
  const courseStats = await Promise.all(
    selectedCourses.map(async (course) => {
      const {
        total_reviews,
        avg_rating,
        avg_grade,
        take_again_percent,
        rating_distribution,
        grade_distribution,
      } = (await fetcher(
        process.env.BASE_API_URL + `/core/courses/${course}/reviews-stats`,
      )) as ProfessorsIDReviewStatsResponse;
      const review = roundToTenth(avg_rating ?? 0);
      const takeAgainPercent = roundToTenth(take_again_percent ?? 0);
      return {
        id: course,
        totalReviews: total_reviews,
        review,
        avgGrade: avg_grade,
        takeAgainPercent,
        ratingDistribution: rating_distribution,
        gradeDistribution: grade_distribution,
      };
    }),
  );

  return (
    <main>
      <section className="mx-auto flex w-full max-w-content-width items-stretch gap-md px-md">
        <div className="w-[250px] max-lg:hidden">
          <div className="sticky top-0 flex max-h-[100dvh] min-h-[50dvh] w-full flex-col gap-sm overflow-y-auto pb-lg pt-lg">
            <p className="pb-md">
              Search and select professors and/or courses to compare
            </p>
            <div className="pb-lg pr-md">
              <SearchBar param="compareQuery" shouldResetPageOnChange={false} />
            </div>
            <p className="pb-sm text-small-lg">Professors</p>
            {professorsValues.length ? (
              <FilterGroup
                variant="checkbox"
                param="professors"
                values={professorsValues}
                className="pb-lg"
              />
            ) : (
              <p className="text-neutral">No professors found</p>
            )}
            <p className="pb-sm text-small-lg">Courses</p>
            {coursesValues.length ? (
              <FilterGroup
                variant="checkbox"
                param="courses"
                values={coursesValues}
                className="pb-lg"
              />
            ) : (
              <p className="text-neutral">No courses found</p>
            )}
            <LinkBtn
              variant="primary"
              className="flex justify-center bg-background text-primary"
              href="/compare"
            >
              Reset
            </LinkBtn>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-stretch gap-md pb-lg pt-lg">
          <div className="flex gap-sm overflow-x-auto">
            {professorStats.map((professor) => (
              <CompareItem
                key={professor.id}
                link={`/professors/${professor.id}`}
                review={professor.review}
                takeAgainPercent={professor.takeAgainPercent}
                avgGrade={professor.avgGrade}
                totalReviews={professor.totalReviews}
                id={professor.id}
              />
            ))}
            {courseStats.map((course) => (
              <CompareItem
                key={course.id}
                link={`/courses/${course.id}`}
                review={course.review}
                takeAgainPercent={course.takeAgainPercent}
                avgGrade={course.avgGrade}
                totalReviews={course.totalReviews}
                id={course.id}
              />
            ))}
          </div>
          <Card className="p-lg max-lg:w-full lg:flex-1">
            <p className="pb-sm font-bold">Rating Distribution</p>
            <BarChart
              series={[
                ...(professorStats.map((professor) => ({
                  name: professor.id,
                  data: professor.ratingDistribution,
                })) ?? []),
                ...(courseStats.map((course) => ({
                  name: course.id,
                  data: course.ratingDistribution,
                })) ?? []),
              ]}
              categories={[5, 4, 3, 2, 1]}
            />
          </Card>
          <Card className="p-lg max-lg:w-full lg:flex-1">
            <p className="pb-sm font-bold">Grade Distribution</p>
            <BarChart
              series={[
                ...(professorStats.map((professor) => ({
                  name: professor.id,
                  data: professor.gradeDistribution,
                })) ?? []),
                ...(courseStats.map((course) => ({
                  name: course.id,
                  data: course.gradeDistribution,
                })) ?? []),
              ]}
              categories={[
                'A+',
                'A',
                'A-',
                'B+',
                'B',
                'B-',
                'C+',
                'C',
                'C-',
                'D+',
                'D',
                'D-',
                'F',
              ]}
            />
          </Card>
        </div>
      </section>
    </main>
  );
}
