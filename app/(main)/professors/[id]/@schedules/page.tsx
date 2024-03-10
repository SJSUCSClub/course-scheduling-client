import Schedule from '@/components/schedule/schedule';
import SectionLabel from '@/components/section-label';
import {
  CourseSchedulesRouteResponse,
  response,
} from '@/app/mock-api/course-schedules';
import { fakeFetch } from '@/utils/fake-fetch';

export default async function Page() {
  const professorSchedules = await fakeFetch<CourseSchedulesRouteResponse>(
    response,
    2000,
  );
  return (
    <main className="flex flex-col gap-[10px] pb-[10px]">
      <SectionLabel info="Statistics">Schedule</SectionLabel>
      {professorSchedules.map((professorSchedule, i) => {
        const { course, section, name, days, ...rest } = professorSchedule;
        return (
          <Schedule
            key={i}
            heading={`${course} - ${section}`}
            subheading={name}
            days={new Set(days)}
            {...rest}
          />
        );
      })}
    </main>
  );
}
