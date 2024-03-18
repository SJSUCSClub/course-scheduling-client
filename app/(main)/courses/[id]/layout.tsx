export default function Layout({
  summary,
  courses,
  reviews,
}: {
  summary: React.ReactNode;
  courses: React.ReactNode;
  reviews: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex flex-col gap-[10px] p-[10px] max-width">
      {summary}
      {courses}
      {reviews}
    </main>
  );
}
