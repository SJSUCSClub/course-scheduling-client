export default function Layout({
  summary,
  schedules,
  reviews,
}: {
  summary: React.ReactNode;
  schedules: React.ReactNode;
  reviews: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      {summary}
      {schedules}
      {reviews}
    </main>
  );
}
