import SectionLabel from '@/components/section-label';

export default function Page() {
  const totalReviews = 176; // TODO - use a real fetch here
  return (
    <section className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      <SectionLabel info="Reviews">{totalReviews} Reviews</SectionLabel>
    </section>
  );
}
