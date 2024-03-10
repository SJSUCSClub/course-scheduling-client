import Breadcrumb from '@/components/breadcrumb';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  return {
    title: params.id,
  };
};

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
      <Breadcrumb className="flex w-full min-w-min py-[10px]" />
      {summary}
      {schedules}
      {reviews}
    </main>
  );
}
