import { ScheduleBox } from '@/components/schedule/schedule';
import { SectionLabelBox } from '@/components/section-label';

export default function Loading() {
  return (
    <section className="flex flex-col gap-[10px] pb-[10px] opacity-30">
      <SectionLabelBox className="mt-[20px] h-[20px] w-[80px] flex-initial animate-pulse rounded-sm bg-neutral p-0" />
      {Array.from({ length: 4 }, (_, i) => (
        <ScheduleBox key={i} className="h-[122px] animate-pulse bg-border" />
      ))}
    </section>
  );
}
