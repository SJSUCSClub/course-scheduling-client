import { Metadata } from 'next';

import { Search } from '@/components/forms/text-input';
import SectionLabel from '@/components/section-label';

export const metadata: Metadata = {
  title: 'Search Results',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <section className="flex items-stretch gap-[10px]">
        <div className="w-[250px] max-lg:hidden">
          <div className="sticky top-0 flex max-h-[100dvh] w-full flex-col gap-[10px] overflow-y-auto">
            <SectionLabel>Filters</SectionLabel>
            <Search helper="Find specific words." />
            {/* <TagCheckboxGroup
          onChange={handleSetTags as (value: string[]) => void}
          label="Tags"
          disabled={loading}
        >
          {
            paginatedItems?.filters.tags.map((tag) => (
              <TagCheckbox key={tag.tag} value={tag.tag} count={tag.count}>
                {tag.tag}
              </TagCheckbox>
            )) as React.ReactNode[]
          }
        </TagCheckboxGroup>
        <TagCheckboxGroup
          onChange={handleSetCourses}
          label="Courses"
          disabled={loading}
        >
          {
            paginatedItems?.filters.courses.map((tag) => (
              <TagCheckbox
                key={tag.course}
                value={tag.course}
                count={tag.count}
              >
                {tag.course}
              </TagCheckbox>
            )) as React.ReactNode[]
          }
        </TagCheckboxGroup> */}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[10px] pb-[10px]">
          <div className="flex justify-between">
            <SectionLabel info="Reviews">50 Courses</SectionLabel>
            {/* <Dropdown
          options={['Relevant', 'Newest', 'Highest', 'Lowest']}
          values={['relevant', 'newest', 'highest', 'lowest']}
          onChange={(e) => handleSetSort(e.target.value as SortType)}
          disabled={loading}
        /> */}
          </div>
          {/* {paginatedItems?.items.map((review, i) => {
        const { courseNumber, department, courseId, ...rest } = review;
        return (
          <Review key={i} title={`${department}${courseNumber}`} {...rest} />
        );
      })} */}
        </div>
      </section>
    </main>
  );
}
