import SectionLabel from '@/components/section-label';

export default function Page() {
  return (
    <section className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <SectionLabel info="Sessions">Courses in Session</SectionLabel>
      {/** Use a bunch of schedules */}
    </section>
  );
}
